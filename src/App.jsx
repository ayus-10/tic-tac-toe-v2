import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const getArray = (elements) => {
    return Array.from({ length: 9 }).fill(elements);
  };

  const updateState = (prevState, index, value) => {
    let newState = [...prevState];
    newState[index] = value;
    return newState;
  };

  const [xState, setXState] = useState(getArray(0));
  const [oState, setOState] = useState(getArray(0));
  const [gameBoard, setGameBoard] = useState(getArray(null));

  const [turn, changeTurn] = useState(1);

  const handleClick = (index) => {
    changeTurn((turn) => 1 - turn);

    if (turn === 1) {
      if (xState[index] !== "1" && oState[index] !== "1") {
        setXState((prevState) => updateState(prevState, index, "1"));
      }
    } else if (turn === 0) {
      if (xState[index] !== "1" && oState[index] !== "1") {
        setOState((prevState) => updateState(prevState, index, "1"));
      }
    }
  };

  const checkWinner = () => {
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    wins.forEach((win, index) => {
      if (xState[win[0]] + xState[win[1]] + xState[win[2]] === "111") {
        alert("X Won");
        location.reload();
      } else if (oState[win[0]] + oState[win[1]] + oState[win[2]] === "111") {
        alert("O Won");
        location.reload();
      }
    });
  };

  useEffect(() => {
    gameBoard.forEach((_, index) => {
      if (xState[index] === "1") {
        setGameBoard((prevState) => updateState(prevState, index, "X"));
      } else if (oState[index] === "1") {
        setGameBoard((prevState) => updateState(prevState, index, "O"));
      }
    });

    checkWinner();
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
