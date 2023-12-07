interface HistoryCardProps {
  topic: string;
  numCards: number;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ topic, numCards }) => {
  return (
    <button className="flex justify-between border border-gray-500 bg-[#1a202c] rounded-lg p-3">
      <div className="font-semibold">{topic}</div>
      <div className="text-gray-400">{numCards} Cards</div>
    </button>
  );
};

export default HistoryCard;
