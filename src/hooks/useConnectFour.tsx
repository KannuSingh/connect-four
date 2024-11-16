import { useState, useEffect } from "react";
import { useApplicationContext } from "../context/ApplicationContext"; // Import the context

const ROWS = 6;
const COLS = 7;

export const useConnectFour = () => {
  const { smartSession, setSmartSession } = useApplicationContext();
  const [board, setBoard] = useState<Array<(string | null)[]>>(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('Red');
  const [winner, setWinner] = useState<string | null>(null);
  const [winningCells, setWinningCells] = useState<number[][] | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

  useEffect(() => {
    if (smartSession?.gameInfo?.gameState) {
      const { gameState } = smartSession.gameInfo;
      setBoard(gameState.board);
      setCurrentPlayer(gameState.isXNext ? 'Red' : 'Yellow');
      setWinner(gameState.winner);
      setWinningCells(gameState.winningLine);
    }
  }, [smartSession]);

  const updateGameState = (newBoard: (string | null)[][], winner: string | null, winningCells: number[][] | null) => {
    if (smartSession?.gameInfo) {
      const newGameState = {
        ...smartSession.gameInfo,
        gameState: {
          ...smartSession.gameInfo?.gameState,
          board: newBoard,
          winner,
          winningLine: winningCells,
        },
      };

      setSmartSession({
        ...smartSession,
        gameInfo: {
          ...smartSession.gameInfo,
          gameState: newGameState.gameState,
        },
      });
    }
  };

  const startGame = () => {
    const newBoard = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    setBoard(newBoard);
    setCurrentPlayer('Red');
    setWinner(null);
    setWinningCells(null);

    if (smartSession) {
      setSmartSession({
        ...smartSession,
        gameInfo: {
          ...smartSession.gameInfo,
          gameStarted: true,
          gameState: {
            board: newBoard,
            winner: null,
            winningLine: null,
            isXNext: false,
            gameId: null
          },
        },
      });
    }
  };

  const dropToken = (col: number) => {
    if (winner) return;

    for (let row = ROWS - 1; row >= 0; row--) {
      if (!board[row][col]) {
        const newBoard = [...board];
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);

        const winning = checkWinner(newBoard, row, col);
        if (winning) {
          setWinner(currentPlayer);
          updateGameState(newBoard, currentPlayer, winning);
        } else {
          setCurrentPlayer(currentPlayer === 'Red' ? 'Yellow' : 'Red');
          updateGameState(newBoard, null, null);
        }
        break;
      }
    }
  };

  const checkWinner = (board: (string | null)[][], row: number, col: number) => {
    const directions = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: -1 },
    ];

    for (const direction of directions) {
      const winningLine = [
        [row, col],
        ...collectTokens(board, row, col, direction.x, direction.y),
        ...collectTokens(board, row, col, -direction.x, -direction.y),
      ];

      if (winningLine.length >= 4) {
        setWinningCells(winningLine);
        return winningLine;
      }
    }

    return null;
  };

  const collectTokens = (
    board: (string | null)[][],
    row: number,
    col: number,
    dx: number,
    dy: number
  ) => {
    const cells: number[][] = [];
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
    const newBoard = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    setBoard(newBoard);
    setCurrentPlayer('Red');
    setWinner(null);
    setWinningCells(null);
    setHoveredColumn(null);

    if (smartSession) {
      updateGameState(newBoard, null, null);
    }
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
    startGame,
  };
};
