import { getRandomInt } from "./getRandomInt";

export const getRandomWord = (wordPool: string[]) => {
  return wordPool[getRandomInt(wordPool.length)];
};
