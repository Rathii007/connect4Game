import React, { useEffect, useState, useCallback } from "react";
import GameCircle from "./GameCircle";
import "./Game.css";
import Header from "./Header";
import Footer from "./Footer";
import Confetti from "react-confetti";
import { isWinner, isDraw, getComputerMove } from "../helper";
import InstructionModal from "./InstructionModel";
import ScoreBoard from "./ScoreBoard";
import StartScreen from "./StartScreen"; // Import StartScreen component
import {
  GAME_STATE_DRAW,
  GAME_STATE_PLAYING,
  GAME_STATE_WIN,
  NO_PLAYER,
  PLAYER_1,
  PLAYER_2,
} from "../Constants";

const GameBoard = () => {
  const [gameBoard, setGameBoard] = useState(Array(16).fill(NO_PLAYER));
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
  const [winPlayer, setWinPlayer] = useState(NO_PLAYER);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [numberOfPlayers, setNumberOfPlayers] = useState(1); // 1 for computer, 2 for friend
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const [history, setHistory] = useState([]); // State for storing game board history
  const [showStartScreen, setShowStartScreen] = useState(true); // State for showing start screen

  useEffect(() => {
    setShowInstructions(true);
  }, []);

  const resetGame = useCallback(() => {
    setGameBoard(Array(16).fill(NO_PLAYER));
    setCurrentPlayer(PLAYER_1);
    setGameState(GAME_STATE_PLAYING);
    setWinPlayer(NO_PLAYER);
    setIsGameOver(false);
    setHistory([]); // Clear history when resetting the game
  }, []);

  const startGame = useCallback(
    (numPlayers) => {
      setShowStartScreen(false);
      setNumberOfPlayers(numPlayers);
      resetGame();
    },
    [resetGame]
  );

  const circleClicked = useCallback(
    (id) => {
      if (isComputerTurn || gameBoard[id] !== NO_PLAYER || isGameOver) return; // Disable click during computer's turn

      const newBoard = gameBoard.map((circle, pos) =>
        pos === id ? currentPlayer : circle
      );

      // Update history
      setHistory([...history, gameBoard]);

      if (isWinner(newBoard, id, currentPlayer)) {
        setGameBoard(newBoard); // Update the board before declaring the winner
        setGameState(GAME_STATE_WIN);
        setWinPlayer(currentPlayer);
        setIsGameOver(true);
        if (currentPlayer === PLAYER_1) {
          setPlayer1Score(player1Score + 1);
        } else {
          setPlayer2Score(player2Score + 1);
        } // Set game over flag
      } else if (isDraw(newBoard, id, currentPlayer)) {
        setGameBoard(newBoard); // Update the board before declaring the draw
        setGameState(GAME_STATE_DRAW);
        setIsGameOver(true); // Set game over flag
      } else {
        setGameBoard(newBoard);
        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
      }
    },
    [
      gameBoard,
      currentPlayer,
      isGameOver,
      isComputerTurn,
      history,
      player1Score,
      player2Score,
    ]
  );

  useEffect(() => {
    if (numberOfPlayers === 1 && currentPlayer === PLAYER_2 && !isGameOver) {
      setIsComputerTurn(true);
      const computerMove = getComputerMove(gameBoard);
      setTimeout(() => {
        circleClicked(computerMove);
        setIsComputerTurn(false); // After the computer's move, allow user to click again
      }, 1000); // Simulate delay for computer's move
    }
  }, [gameBoard, currentPlayer, isGameOver, numberOfPlayers, circleClicked]);

  const undoMove = useCallback(() => {
    if (history.length === 0 || isComputerTurn) return; // No moves to undo or during computer's turn

    const previousBoard = history[history.length - 1];
    setGameBoard(previousBoard);
    setHistory(history.slice(0, -1)); // Remove the last state from history
  }, [history, isComputerTurn]);

  const suggestMove = useCallback(() => {
    if (numberOfPlayers === 1 && currentPlayer === PLAYER_1 && !isGameOver) {
      const computerMove = getComputerMove(gameBoard);
      circleClicked(computerMove);
    }
  }, [numberOfPlayers, currentPlayer, isGameOver, gameBoard, circleClicked]);

  const togglePlayers = useCallback(() => {
    setNumberOfPlayers(numberOfPlayers === 1 ? 2 : 1);
  }, [numberOfPlayers]);

  const renderCircle = useCallback(
    (id) => (
      <GameCircle
        key={id}
        id={id}
        className={`player_${gameBoard[id]}`}
        onCircleClicked={circleClicked}
        disabled={isComputerTurn} // Disable circle during computer's turn
      />
    ),
    [gameBoard, circleClicked, isComputerTurn]
  );

  const closeInstructions = useCallback(() => {
    setShowInstructions(false);
  }, []);

  const openInstructions = useCallback(() => {
    setShowInstructions(true);
  }, []);

  if (showStartScreen) {
    return <StartScreen onStartGame={startGame} />;
  }

  return (
    <>
      <Header
        gameState={gameState}
        currentPlayer={currentPlayer}
        winPlayer={winPlayer}
      />
      <ScoreBoard player1Score={player1Score} player2Score={player2Score} />
      <div className="gameBoard">
        {gameBoard.map((_, id) => renderCircle(id))}
      </div>
      {gameState === GAME_STATE_WIN && <Confetti />}
      <Footer
        resetGame={resetGame}
        onSuggestClick={suggestMove}
        undoMove={undoMove}
        onTogglePlayers={togglePlayers}
        numberOfPlayers={numberOfPlayers}
        isComputerTurn={isComputerTurn}
      />
      <button className="help-button" onClick={openInstructions}>
        Help
      </button>
      <InstructionModal show={showInstructions} onClose={closeInstructions} />
    </>
  );
};

export default GameBoard;
