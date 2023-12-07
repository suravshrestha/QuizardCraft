import React from "react";

interface FlashCardProps {
  question: string;
  answer: string;
  isFlipped: boolean;
  setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
}

const FlashCard: React.FC<FlashCardProps> = ({
  question,
  answer,
  isFlipped,
  setIsFlipped,
}) => {
  return (
    <div className="flex flex-col mb-3 rounded-lg border border-gray-500 bg-[#1f1f1f] font-semibold text-white shadow-md h-80">
      <div className="flex items-center justify-center text-2xl h-full">
        {isFlipped ? answer : question}
      </div>

      <button
        onClick={() => setIsFlipped(!isFlipped)}
        className="text-sm font-semibold text-gray-400 hover:text-gray-200 mb-3 align-bottom"
      >
        FLIP
      </button>
    </div>
  );
};

export default FlashCard;
