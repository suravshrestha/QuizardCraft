export interface ICard {
  question: string;
  answer: string;
}

export interface ICardDeck {
  topic: string;
  cards: ICard[];
}
