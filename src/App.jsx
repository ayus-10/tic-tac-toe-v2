import React, { useState } from "react";
import Game from "./Game";
import Background from "./background.jpg";
import styles from "./App.module.css";

const App = () => {
  const [turn, setTurn] = useState("X");

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <h1 className={styles.turn}>{turn}'s turn</h1>
      <Game setTurn={setTurn} />
    </div>
  );
};

export default App;
