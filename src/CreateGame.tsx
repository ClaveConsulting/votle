import { useState } from "react";
import { GameSetup } from "./GameSetup";
import { wordPool } from "./words";
import { getRandomWord } from "./getRandomWord";
import { funnyPlayerNames } from "./funnyPlayerNames";

function usePlayerNamePool() {
  const [names, setNames] = useState(funnyPlayerNames);

  return {
    give: (n: number) => {
      let leftovers = names;
      const result = [];

      for (let i = 0; i < n; i++) {
        const next = getRandomWord(leftovers);
        result.push(next);
        leftovers = leftovers.filter((n) => n !== next);
      }

      setNames(leftovers);

      return result
    },
  };
}

export function CreateGame({
  onCreate,
}: {
  onCreate(gameSetup: GameSetup): void;
}) {
  const names = usePlayerNamePool();
  const [playerNames, setPlayerNames] = useState(() => names.give(2));
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
                />
              </label>
            </li>
          ))}
          <button
            type="button"
            onClick={() => {
              setPlayerNames((prev) => [...prev, ...names.give(1)]);
            }}
          >
            (+) Add player
          </button>
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
