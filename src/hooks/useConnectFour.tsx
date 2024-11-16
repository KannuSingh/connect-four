import { useState } from 'react';

const ROWS = 6;
const COLS = 7;

export const useConnectFour = () => {
  const [board, setBoard] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('Red');
  const [winner, setWinner] = useState<string | null>(null);
  const [winningCells, setWinningCells] = useState<number[][] | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

  const dropToken = (col: number) => {
    if (winner) return;

    for (let row = ROWS - 1; row >= 0; row--) {
      if (!board[row][col]) {
        const newBoard = [...board];
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);

        if (checkWinner(newBoard, row, col)) {
          setWinner(currentPlayer);
        } else {
          setCurrentPlayer(currentPlayer === 'Red' ? 'Yellow' : 'Red');
        }

        break;
      }
    }
  };

  const checkWinner = (board: string[][], row: number, col: number) => {
    const directions = [
      { x: 0, y: 1 },   // Horizontal
      { x: 1, y: 0 },   // Vertical
      { x: 1, y: 1 },   // Diagonal down-right
      { x: 1, y: -1 },  // Diagonal down-left
    ];

    for (const direction of directions) {
      const winningLine = [
        [row, col],
        ...collectTokens(board, row, col, direction.x, direction.y),
        ...collectTokens(board, row, col, -direction.x, -direction.y),
      ];

      if (winningLine.length >= 4) {
        setWinningCells(winningLine);
        return true;
      }
    }

    return false;
  };

  const collectTokens = (
    board: string[][],
    row: number,
    col: number,
    dx: number,
    dy: number
  ) => {
    const cells = [];
    let currentRow = row + dy;
    let currentCol = col + dx;

    while (
      currentRow >= 0 &&
      currentRow < ROWS &&
      currentCol >= 0 &&
      currentCol < COLS &&
      board[currentRow][currentCol] === currentPlayer
    ) {
      cells.push([currentRow, currentCol]);
      currentRow += dy;
      currentCol += dx;
    }

    return cells;
  };

  const resetGame = () => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
    setCurrentPlayer('Red');
    setWinner(null);
    setWinningCells(null);
    setHoveredColumn(null);
  };

  const getHoverRow = (col: number) => {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!board[row][col]) {
        return row;
      }
    }
    return null;
  };

  return {
    board,
    currentPlayer,
    winner,
    dropToken,
    resetGame,
    winningCells,
    hoveredColumn,
    setHoveredColumn,
    getHoverRow,
  };
};
