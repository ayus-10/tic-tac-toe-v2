import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const zeroArray = () => {
    return Array.from({ length: 9 }).fill("0");
  };

  const updateState = (prevState, index, value) => {
    let newState = [...prevState];
    newState[index] = value;
    return newState;
  };

  const [xState, setXState] = useState(zeroArray());
  const [oState, setOState] = useState(zeroArray());
  const [gameBoard, setGameBoard] = useState(Array.from({ length: 9 })); // redundancy

  const [turn, changeTurn] = useState(1);

  const handleClick = (index) => {
    changeTurn((turn) => 1 - turn);

    if (turn === 1) {
      setXState((prevState) => updateState(prevState, index, "1"));
    } else if (turn === 0) {
      setOState((prevState) => updateState(prevState, index, "1"));
    }
  };

  useEffect(() => {
    gameBoard.forEach((_, index) => {
      if (xState[index] === "1") {
        setGameBoard((prevState) => updateState(prevState, index, "X"));
      } else if (oState[index] === "1") {
        setGameBoard((prevState) => updateState(prevState, index, "O"));
      }
    });
  }, [xState, oState]);

  return (
    <div className="container">
      <div className="game">
        {Array.from({ length: 9 }).map((_item, index) => {
          return (
            <button
              key={index}
              className="box"
              onClick={() => handleClick(index)}
            >
              {gameBoard[index]}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default App;
