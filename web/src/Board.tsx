import "./Board.css";
import { Scored, getScoreData } from "./words";

function getColor(score: Scored) {
  switch (score) {
    case "c":
      return "#6aaa64"; // #6aaa64 green
    case "p":
      return "#c9b458"; // #c9b458 yellow
    case "x":
      return "#787c7e"; // #787c7e gray
  }
}

function PlaceholderRow() {
  return (
    <div className="boardrow">
      {new Array(5).fill(0).map((_, colIndex) => {
        return <div className="characterbox" key={colIndex}></div>;
      })}
    </div>
  );
}

const Board = ({ answer, mergedGuesses }: { answer: string[], mergedGuesses: string[][] }) => {
  return (
    <div className="board">
      {new Array(6).fill(0).map((_, rowIndex) => {
        const row = mergedGuesses[rowIndex];
        if (!row) {
          return <PlaceholderRow key={rowIndex} />;
        }
        const scoreDataForRow = getScoreData(answer, row);
        return (
          <div className="boardrow" key={rowIndex}>
            {row.map((letter, colIndex) => {
              return (
                <div
                  key={colIndex}
                  className="characterbox"
                  style={{
                    backgroundColor: getColor(scoreDataForRow[colIndex]),
                    color: "white",
                  }}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
