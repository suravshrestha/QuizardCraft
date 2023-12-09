import React from "react";
import Spinner from "./Spinner";

interface FlashCardProps {
  question: string;
  answer: string;
  isFlipped: boolean;
  isCrafting: boolean;
  setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
}

const FlashCard: React.FC<FlashCardProps> = ({
  question,
  answer,
  isFlipped,
  isCrafting,
  setIsFlipped,
}) => {
  const formatAnswer = (text: string) => {
    return text
      .replace(/Example:/g, "\nExample:")
      .split(/\n/)
      .map((paragraph, index) => (
        <span
          key={index}
          className={paragraph.startsWith("Example:") ? "mt-0" : "mt-1"}
        >
          {paragraph}
        </span>
      ));
  };

  return (
    <div className="flex flex-col mb-3 rounded-lg border border-gray-500 bg-[#1f1f1f] shadow-md h-80">
      <div
        className={`inline-grid ${
          !isFlipped ? "text-2xl font-semibold justify-center items-center" : ""
        } ${isFlipped && answer.length < 500 ? "items-center text-xl" : ""} ${
          isFlipped && answer.length >= 500 ? "text-lg text-left" : ""
        } h-full px-8 my-4 overflow-auto text-white`}
      >
        {isCrafting ? (
          <Spinner size={10} />
        ) : isFlipped ? (
          formatAnswer(answer)
        ) : (
          question
        )}
      </div>

      {!isCrafting && (
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="text-sm font-semibold text-gray-400 hover:text-gray-200 mb-3 align-bottom"
        >
          FLIP
        </button>
      )}
    </div>
  );
};

export default FlashCard;
