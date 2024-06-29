import React from "react";
import "./Game.css";

const GameCircle = ({ id, className, onCircleClicked }) => {
  const handleTouch = () => {
    onCircleClicked(id);
  };
  return (
    <div
      className={`gameCircle ${className}`}
      onClick={() => onCircleClicked(id)}
      onTouchStart={handleTouch}
    />
  );
};

export default GameCircle;
