import { useState } from "react";
import "./App.css";
import Logo from "./assets/votle-high-resolution-logo.png";
import { Game } from "./Game";
import { CreateGame } from "./CreateGame";
import { GameSetup } from "./GameSetup";


function App() {
  const [gameSetup, setGameSetup] = useState<GameSetup | null>(null);
  return (
    <div>
      <div>
        <img src={Logo} width={200} height={150} alt="Votle" />
      </div>
      {!gameSetup && <CreateGame onCreate={setGameSetup} />}
      {gameSetup && <Game setup={gameSetup} />}
    </div>
  );
}
export default App;
