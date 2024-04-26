import { useState } from "react";
import { GameSetup } from "./GameSetup";
import { getRandomWord, wordPool } from "./words";

export function CreateGame({
  onCreate,
}: {
  onCreate(gameSetup: GameSetup): void;
}) {
  const [playerNames, setPlayerNames] = useState(["Boogie", "Pooh"]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const answer = getRandomWord(wordPool());
        onCreate({ playerNames, answer });
      }}
    >
      <fieldset>
        <legend>Create Game</legend>
        <label htmlFor="numPlayers">Number of players</label>
        <ul>
          {playerNames.map((name, i) => (
            <li key={i}>
              <label>
                <span>Player #{i}</span>
              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setPlayerNames([
                    ...playerNames.slice(0, i),
                    e.target.value,
                    ...playerNames.slice(i + 1),
                  ])
                }
              /></label>
            </li>
          ))}
          <button type="button" onClick={() => {setPlayerNames(prev => [...prev, "Clown"])}}>(+) Add player</button>
        </ul>
        <button
          disabled={
            playerNames.length < 2 ||
            !!playerNames.find((name) => name.length === 0)
          }
          type="submit"
        >
          Create Game
        </button>
      </fieldset>
    </form>
  );
}
