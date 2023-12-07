import OpenAI from "openai";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function generateFlashcards(topic: string, numCards: number = 10) {
  try {
    const prompt = `Create ${numCards} simple flashcards for a ${topic} quiz, in the following format: [{question: '', answer: ''}]. Feel free to elaborate on each answer to cover important details. Do not return any non-json text or numbering.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 1500,
    });

    const content = response.choices[0]?.message?.content || "";
    const flashcards = parseFlashcards(content);

    return flashcards;
  } catch (error) {
    console.error("Error generating flashcards:", error);
    throw error;
  }
}

function parseFlashcards(content: string) {
  try {
    const flashcards = JSON.parse(content);
    return flashcards;
  } catch (error) {
    console.error("Error parsing flashcards:", error);
    throw error;
  }
}

export { generateFlashcards };
