import { useState } from "react";
import { GameSetup } from "./GameSetup";
import { getRandomWord, wordPool } from "./words";


export function CreateGame({ onCreate }: { onCreate(gameSetup: GameSetup): void; }) {
  const [numPlayers, setNumPlayers] = useState(2);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const answer = getRandomWord(wordPool());
        onCreate({ numPlayers, answer });
      }}
    >
      <fieldset>
        <legend>Create Game</legend>
        <label htmlFor="numPlayers">Number of players</label>
        <select
          id="numPLayers"
          value={numPlayers}
          onChange={(e) => setNumPlayers(parseFloat(e.target.value))}
        >
          {[2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} players
            </option>
          ))}
        </select>
        <button type="submit">Create Game</button>
      </fieldset>
    </form>
  );
}
