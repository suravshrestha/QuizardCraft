import { ICard } from "../common/types";

interface HistoryCardProps {
  topic: string;
  numCards: number;
  cards: ICard[];
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
  reset: () => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  topic,
  numCards,
  cards,
  setCards,
  reset,
}) => {
  return (
    <button
      className="flex justify-between border border-gray-500 bg-[#1a202c] rounded-lg p-3"
      onClick={() => {
        setCards(cards);
        reset();
      }}
    >
      <div className="font-semibold">{topic}</div>
      <div className="text-gray-400">{numCards} Cards</div>
    </button>
  );
};

export default HistoryCard;
