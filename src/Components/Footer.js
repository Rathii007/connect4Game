import React from "react";

const Footer = ({
  resetGame,
  onSuggestClick,
  undoMove,
  onTogglePlayers,
  numberOfPlayers,
}) => {
  return (
    <footer className="panel footer">
      <button className="btn" onClick={resetGame} aria-label="New Game">
        New Game
      </button>{" "}
      <button className="btn" onClick={onSuggestClick}>
        Suggest Move
      </button>{" "}
      {numberOfPlayers === 2 && ( // Render Undo Move button only if playing with a friend
        <button className="btn" onClick={undoMove}>
          Undo Move
        </button>
      )}
      <button className="btn" onClick={onTogglePlayers}>
        {numberOfPlayers === 1 ? "Play with a Friend" : "Play with AI"}
      </button>
    </footer>
  );
};

export default Footer;
