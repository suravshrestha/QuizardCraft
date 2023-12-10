import { MdDeleteForever } from "react-icons/md";

import { ICard, ICardDeck } from "../common/types";

interface HistoryCardProps {
  index: number;
  topic: string;
  numCards: number;
  isCrafting: boolean;
  cards: ICard[];
  cardDecksFromLocalStorage: ICardDeck[];
  currentCardDeckIndex: number;
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
  reset: () => void;
  setCardDecksFromLocalStorage: React.Dispatch<
    React.SetStateAction<ICardDeck[]>
  >;
  setCurrentCardDeckIndex: React.Dispatch<React.SetStateAction<number>>;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  index,
  topic,
  numCards,
  isCrafting,
  cards,
  cardDecksFromLocalStorage,
  currentCardDeckIndex,
  setCards,
  reset,
  setCardDecksFromLocalStorage,
  setCurrentCardDeckIndex,
}) => {
  return (
    <div className="flex items-center justify-between">
      <button
        disabled={index === currentCardDeckIndex || isCrafting}
        className={`flex items-center justify-between border border-gray-500 bg-[#1a202c] ${
          index === currentCardDeckIndex ? "text-white" : "text-gray-400"
        } rounded-lg p-3 w-full`}
        onClick={() => {
          setCurrentCardDeckIndex(index);
          setCards(cards);
          reset();
        }}
      >
        <div className="font-semibold">{topic}</div>
        <div className="text-gray-400">{numCards} Cards</div>
      </button>

      <button
        className="ml-2"
        onClick={() => {
          const newCardDecks = cardDecksFromLocalStorage.filter(
            (_, i) => i !== index,
          );
          setCardDecksFromLocalStorage(newCardDecks);
          localStorage.setItem("cardDecks", JSON.stringify(newCardDecks));
        }}
      >
        <MdDeleteForever className="text-red-500" size={23} />
      </button>
    </div>
  );
};

export default HistoryCard;
