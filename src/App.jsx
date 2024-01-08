import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const zeroArray = () => {
    return Array.from({ length: 9 }).fill(0);
  };

  const [xState, setXState] = useState(zeroArray());
  const [oState, setOState] = useState(zeroArray());

  const [playerCount, setPlayerCount] = useState(1);

  const handleClick = (index) => {
    setPlayerCount((playerCount) => 1 - playerCount);

    const updateState = (prevState) => {
      let newState = [...prevState];
      newState[index] = 1;
      return newState;
    };

    if (playerCount === 1) {
      setXState(updateState);
    } else if (playerCount === 0) {
      setOState(updateState);
    }
  };

  useEffect(() => {
    console.log(xState);
  }, [xState]);

  useEffect(() => {
    console.log(oState);
  }, [oState]);

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
              {playerCount === 1
                ? xState[index] === 1
                  ? "X"
                  : null
                : oState[index] === 1
                ? "O"
                : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default App;
