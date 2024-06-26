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
    { round: number; guesses: Guess[]; guess: string[]; scoreData: ScoreData }[]
  >([]);

  function onNextRound(guesses: Guess[]) {
    setCurrentPlayerIndex(0);
    setPrevGuesses([]);
    setRound((prev) => prev + 1);

    const guess = getMergedGuessWord(
      guesses.map(({ guess }) => guess.split(""))
    );

    const nextScoreData = getScoreData(setup.answer.split(""), guess);
    setScoreData((prev) => [
      ...prev,
      {
        round,
        guesses,
        guess,
        scoreData: nextScoreData,
      },
    ]);

    const hasWon = nextScoreData.every(c => c === "c");
    if (hasWon) alert("YAY");

    if (round >= 5) {
      alert(`Game Over. Answer was: ${setup.answer}`);
    }
  }

  const isLast = currentPlayerIndex == setup.playerNames.length - 1;
  function onNextPlayer(guesses: Guess[]) {
    if (!isLast) {
      setCurrentPlayerIndex((prev) => prev + 1);
    } else {
      onNextRound(guesses);
    }
  }

  const activePlayerIndex = prevGuesses.length;

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
        <h1>Round {round + 1} / 6</h1>
        <h2>Player {setup.playerNames[activePlayerIndex]}</h2>
        <p>Players: {setup.playerNames.join(", ")}</p>
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
          style={{ marginBottom: "1rem" }}
        >
          <label htmlFor="guess" style={{ display: "none" }}>
            Your guess
          </label>
          <input
            style={{ fontFamily: "monospace", fontSize: "24px", width: "40px" }}
            name="guess"
            id="guess"
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value.toUpperCase())}
            pattern="[a-zA-Z]{5}"
            maxLength={5}
            minLength={5}
            width={50}
            required
          />
          <button type="submit">Gjett</button>
        </form>
        <details>
          <summary>Reveal spoilers</summary>
          <table>
            <thead>
              <tr>
                <th>Round</th>
                <th>Player</th>
                <th>Guess</th>
                <th>Merged</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {scoreData.map(
                ({ guesses, guess: mergedGuess, scoreData, round }) =>
                  guesses.map(({ player, guess }, playerIndex) => (
                    <tr key={`${round}/${player}`}>
                      {playerIndex === 0 && (
                        <td rowSpan={guesses.length}>{round}</td>
                      )}
                      <td>{setup.playerNames[player]}</td>
                      <td>
                        <code>{guess}</code>
                      </td>
                      {playerIndex === 0 && (<>
                      <td  rowSpan={guesses.length}>
                        <code>{mergedGuess.join("")}</code>
                      </td>
                      <td  rowSpan={guesses.length}>
                        <code>{scoreData.join("")}</code>
                      </td></>)}
                    </tr>
                  ))
              )}
            </tbody>
          </table>
          <details>
            <summary>See answer</summary>
            <code>ANSWER: {setup.answer}</code>
          </details>
        </details>
      </div>
    </>
  );
}
