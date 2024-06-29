import { PLAYER_1, PLAYER_2, NO_PLAYER } from "./Constants";

export const isWinner = (gameBoard, currentMove, currentPlayer) => {
  let board = [...gameBoard];
  board[currentMove] = currentPlayer;
  const winLines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];

  for (let i = 0; i < winLines.length; i++) {
    const [c1, c2, c3, c4] = winLines[i];

    if (
      board[c1] > 0 &&
      board[c1] === board[c2] &&
      board[c2] === board[c3] &&
      board[c3] === board[c4]
    ) {
      return true;
    }
  }
  return false;
};

export const isDraw = (gameBoard, currentMove, currentPlayer) => {
  let board = [...gameBoard];
  board[currentMove] = currentPlayer;

  let count = board.reduce((n, x) => n + (x === 0), 0);
  // console.log(`count ${count}`);
  return count === 0;
};

export const getComputerMove = (gameBoard, currentPlayer) => {
  // Check if the computer can win in the next move
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === NO_PLAYER) {
      let boardCopy = [...gameBoard];
      boardCopy[i] = currentPlayer;
      if (isWinner(boardCopy, i, currentPlayer)) {
        return i;
      }
    }
  }

  // Check if the player is about to win and block them
  let opponent = currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1;
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === NO_PLAYER) {
      let boardCopy = [...gameBoard];
      boardCopy[i] = opponent;
      if (isWinner(boardCopy, i, opponent)) {
        return i;
      }
    }
  }

  // If no immediate win or block, choose a random move
  let openCells = gameBoard.reduce((acc, cell, index) => {
    if (cell === NO_PLAYER) acc.push(index);
    return acc;
  }, []);

  if (openCells.length > 0) {
    let randomIndex = Math.floor(Math.random() * openCells.length);
    return openCells[randomIndex];
  }

  return null;
};
