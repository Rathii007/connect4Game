import React from "react";
import "./ScoreBoard.css";

const ScoreBoard = ({ player1Score, player2Score }) => {
  return (
    <div className="scoreboard">
      <div className="score player1">Player 1: {player1Score}</div>
      <div className="score player2">Player 2: {player2Score}</div>
    </div>
  );
};

export default ScoreBoard;
