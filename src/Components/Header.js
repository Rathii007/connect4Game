import React from "react";
import {
  GAME_STATE_DRAW,
  GAME_STATE_PLAYING,
  GAME_STATE_WIN,
} from "../Constants";

const Header = ({ gameState, currentPlayer, winPlayer }) => {
  const renderLabel = () => {
    switch (gameState) {
      case GAME_STATE_WIN:
        return <div className="celebrate">Player {winPlayer} Wins!</div>;
      case GAME_STATE_DRAW:
        return <div>Game Draw!</div>;
      case GAME_STATE_PLAYING:
      default:
        return <div>Player {currentPlayer} Turn</div>;
    }
  };

  return (
    <div className="panel header">
      <div className="header-text">{renderLabel()}</div>
    </div>
  );
};

export default Header;
