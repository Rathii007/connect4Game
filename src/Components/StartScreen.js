import React from "react";
import "./StartScreen.css";

const StartScreen = ({ onStartGame }) => {
  return (
    <div className="start-screen">
      <div className="button-container">
        <button className="start-button" onClick={() => onStartGame(1)}>
          1 Player
        </button>
        <button className="start-button" onClick={() => onStartGame(2)}>
          2 Players
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
