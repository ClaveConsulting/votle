import { useState } from "react";
import { getScoreData, getMergedGuessWord, ScoreData } from "./words";
import Board from "./Board";
import { GameSetup } from "./GameSetup";

interface Guess {
  player: number;
  guess: string;
}
export function Game({ setup }: { setup: GameSetup }) {
  const [guess, setGuess] = useState("");
  const [round, setRound] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [prevGuesses, setPrevGuesses] = useState<Guess[]>([]);

  const [scoreData, setScoreData] = useState<
    { guess: string[]; scoreData: ScoreData }[]
  >([]);

  function onNextRound(guesses: Guess[]) {
    setCurrentPlayerIndex(0);
    setPrevGuesses([]);
    setRound((prev) => prev + 1);

    const guess = getMergedGuessWord(
      guesses.map(({ guess }) => guess.split(""))
    );

    setScoreData((prev) => [
      ...prev,
      { guess, scoreData: getScoreData(setup.answer.split(""), guess) },
    ]);
  }

  const isLast = currentPlayerIndex == setup.numPlayers - 1;
  function onNextPlayer(guesses: Guess[]) {
    if (!isLast) {
      setCurrentPlayerIndex((prev) => prev + 1);
    } else {
      onNextRound(guesses);
    }
  }

  return (
    <>
      {/* <h1>Dummy</h1>
      <Board
        answer={ANSWER.split("")}
        mergedGuesses={[
          ["A", "B", "C", "D", "E"],
          ["G", "F", "H", "I", "J"],
          ["A", "I", "H", "O", "J"],
        ]}
      /> */}
      {/* <h1>Not Dummy</h1> */}
      <Board
        answer={setup.answer.split("")}
        mergedGuesses={scoreData.map((c) => c.guess)}
      />
      <div className="card">
        <h1>Round {round + 1}</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const next: Guess = { player: currentPlayerIndex, guess };
            setPrevGuesses((prev) => [...prev, next]);
            setGuess("");
            onNextPlayer([
              ...prevGuesses,
              { player: currentPlayerIndex, guess },
            ]);
          }}
        >
          <label htmlFor="guess" style={{ display: "none" }}>
            Your guess
          </label>
          <input
            style={{ fontFamily: "monospace", fontSize: "24px" }}
            name="guess"
            id="guess"
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value.toUpperCase())}
            pattern="[a-zA-Z]{5}"
            maxLength={5}
            minLength={5}
            required
          />
          <button type="submit">
            {isLast ? "Legg inn gjett og gå til neste runde" : "Legg inn gjett"}
          </button>
        </form>
        <details>
          <summary>Reveal this round</summary>
          {!prevGuesses.length && <span>No guesses ☹️</span>}
          <ul>
            {prevGuesses.map(({ player, guess }) => (
              <li key={player}>{guess}</li>
            ))}
          </ul>
        </details>
      </div>
    </>
  );
}
