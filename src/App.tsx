import React, { useEffect, useState } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

import { generateFlashcards } from "./services/flashcardGenerator.ts";
import { ICard, ICardDeck } from "./common/types";

import FlashCard from "./components/FlashCard";
import HistoryCard from "./components/HistoryCard";

function App() {
  const [topic, setTopic] = useState<string>("");
  const [numCards, setNumCards] = useState<number>(10);
  const [cards, setCards] = useState<ICard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isCrafting, setIsCrafting] = useState<boolean>(false);
  const [cardDecksFromLocalStorage, setCardDecksFromLocalStorage] = useState<
    ICardDeck[]
  >([]);

  useEffect(() => {
    const flashcards = localStorage.getItem("flashcards");
    if (flashcards && flashcards.length) {
      setCardDecksFromLocalStorage(JSON.parse(flashcards));
    }
  }, []);

  const reset = () => {
    setTopic("");
    setNumCards(10);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    reset();

    try {
      setIsCrafting(true);
      const flashcards = await generateFlashcards(topic, numCards);

      setIsCrafting(false);
      setCards(flashcards);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNumCardsInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value);
    if (value > 50) {
      e.currentTarget.value = "50";
      setNumCards(50);
    } else if (value < 1) {
      e.currentTarget.value = "1";
      setNumCards(1);
    } else {
      setNumCards(value);
    }
  };

  return (
    <div
      className={`text-center flex flex-col ${
        cards.length && "justify-center"
      }  min-h-screen bg-[#1a202c] py-2`}
    >
      <div className="text-3xl font-bold p-4">
        <span className="text-[#A0FE47]">Quizard</span>
        <span className="text-[#FFD700]">Craft</span>
      </div>
      <div className="grid grid-cols-3 gap-4 mx-64">
        <div className="col-span-2">
          {cards.length !== 0 && (
            <>
              <FlashCard
                question={cards[currentCardIndex].question}
                answer={cards[currentCardIndex].answer}
                isFlipped={isFlipped}
                setIsFlipped={setIsFlipped}
              />

              <div className="flex items-center justify-center text-white gap-4 my-2">
                <button
                  className={`text-2xl ${
                    currentCardIndex === 0 ? "text-gray-400" : ""
                  }`}
                  disabled={currentCardIndex === 0}
                  onClick={() => {
                    setCurrentCardIndex(currentCardIndex - 1);
                    setIsFlipped(false);
                  }}
                >
                  <FaCircleArrowLeft />
                </button>
                <div className="text-xl">
                  {currentCardIndex + 1} / {cards.length}
                </div>
                <button
                  className={`text-2xl ${
                    currentCardIndex === cards.length - 1 ? "text-gray-400" : ""
                  }`}
                  disabled={currentCardIndex === cards.length - 1}
                  onClick={() => {
                    setCurrentCardIndex(currentCardIndex + 1);
                    setIsFlipped(false);
                  }}
                >
                  <FaCircleArrowRight />
                </button>
              </div>
            </>
          )}

          <form className="grid grid-cols-2 gap-2 px-8" onSubmit={handleSubmit}>
            <div className="flex gap-8">
              <div>
                <label htmlFor="topic" className="text-white font-semibold">
                  Topic
                </label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter topic"
                  className="px-2 py-1 my-2 border border-gray-400 outline-none rounded-lg text-black"
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="numCards" className="text-white font-semibold">
                  #Cards
                </label>
                <input
                  type="number"
                  defaultValue={numCards}
                  min={1}
                  max={50}
                  onChange={handleNumCardsInput}
                  id="numCards"
                  name="numCards"
                  placeholder="Enter number of cards"
                  className="px-2 py-1 my-2 border border-gray-400 outline-none rounded-lg text-black"
                />
              </div>
            </div>

            <button
              type="submit"
              className="grid col-span-2 gap-2 bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded text-white"
            >
              {isCrafting ? "Crafting..." : "Craft"}
            </button>
          </form>
        </div>

        {cardDecksFromLocalStorage.length !== 0 && (
          <div className="border border-gray-500 p-4 rounded-lg bg-[#1f1f1f] text-white">
            <div className="text-xl font-bold mb-4">History</div>

            <div className="flex flex-col gap-4 mt-2">
              {cardDecksFromLocalStorage.map((cardDeck, index) => (
                <HistoryCard
                  key={index}
                  topic={cardDeck.topic}
                  numCards={cardDeck.cards.length}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
