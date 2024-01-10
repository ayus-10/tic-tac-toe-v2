import React, { useState, useEffect, useRef } from "react";
import styles from "./Game.module.css";

const Game = () => {
  const getArray = (elements) => {
    return Array.from({ length: 9 }).fill(elements);
  };

  const updateState = (prevState, index, value) => {
    let newState = [...prevState];
    newState[index] = value;
    return newState;
  };

  const turn = useRef(0);
  const switchTurn = () => {
    turn.current = 1 - turn.current;
  };

  const handleInvalidMove = () => {
    alert("Invalid move");
    switchTurn();
  };

  const [xState, setXState] = useState(getArray(0));
  const [oState, setOState] = useState(getArray(0));
  const [gameBoard, setGameBoard] = useState(getArray(null));

  const handleClick = (index) => {
    switchTurn();

    if (turn.current === 1) {
      if (xState[index] !== "1" && oState[index] !== "1") {
        setXState((prevState) => updateState(prevState, index, "1"));
      } else {
        handleInvalidMove();
      }
    } else if (turn.current === 0) {
      if (xState[index] !== "1" && oState[index] !== "1") {
        setOState((prevState) => updateState(prevState, index, "1"));
      } else {
        handleInvalidMove();
      }
    }
  };

  const checkWinner = () => {
    const declareWinner = (player) => {
      alert(`${player} Won`);
      location.reload();
    };

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
        declareWinner("X");
      } else if (oState[win[0]] + oState[win[1]] + oState[win[2]] === "111") {
        declareWinner("O");
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
    <div className={styles.container}>
      <div className={styles.game}>
        {Array.from({ length: 9 }).map((_, index) => {
          return (
            <button
              key={index}
              className={styles.box}
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

export default Game;
