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
    <div className="flex flex-col mb-3 rounded-lg border border-gray-500 bg-[#1f1f1f] shadow-md h-80">
      <div
        className={`flex justify-center ${!isFlipped && "items-center"} ${
          isFlipped ? "text-xl" : "text-2xl font-semibold"
        } ${
          isFlipped && answer.length < 450 && "items-center"
        } h-full px-8 my-4 overflow-auto text-white`}
      >
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
