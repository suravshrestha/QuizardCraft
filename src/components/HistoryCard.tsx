import { MdDeleteForever } from "react-icons/md";

import { ICard, ICardDeck } from "../common/types";

interface HistoryCardProps {
  index: number;
  topic: string;
  numCards: number;
  cards: ICard[];
  cardDecksFromLocalStorage: ICardDeck[];
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
  reset: () => void;
  setCardDecksFromLocalStorage: React.Dispatch<
    React.SetStateAction<ICardDeck[]>
  >;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  index,
  topic,
  numCards,
  cards,
  setCards,
  reset,
  cardDecksFromLocalStorage,
  setCardDecksFromLocalStorage,
}) => {
  return (
    <div className="flex items-center justify-between">
      <button
        className="flex items-center justify-between border border-gray-500 bg-[#1a202c] rounded-lg p-3 w-full"
        onClick={() => {
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
