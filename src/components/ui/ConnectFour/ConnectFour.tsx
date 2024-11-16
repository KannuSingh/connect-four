import React from 'react';
import { useConnectFour } from '../../../hooks/useConnectFour';
import { Button } from '../button';
import styles from './styles.module.css';

const ConnectFour: React.FC = () => {
  const {
    board,
    currentPlayer,
    winner,
    dropToken,
    resetGame,
    winningCells,
    hoveredColumn,
    setHoveredColumn,
    getHoverRow,
  } = useConnectFour();

  return (
    <div className={styles.connectFourContainer}>
      <h1 className={styles.title}>Connect Four</h1>
      <h2 className={styles.currentPlayer}>Current Player: {currentPlayer}</h2>
      {winner && <h2 className={styles.winner}>Winner: {winner}</h2>}
      <div
        className={styles.board}
        onMouseLeave={() => setHoveredColumn(null)} // Clear hover state on mouse leave
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            // Determine if the cell is the preview cell (where the token will drop)
            const hoverRow = hoveredColumn === colIndex ? getHoverRow(colIndex) : null;
            const isHovered = hoverRow === rowIndex;

            // Check if the current cell is part of the winning line
            const isWinningCell = winningCells?.some(
              ([winRow, winCol]) => winRow === rowIndex && winCol === colIndex
            );

            // Identify if it's the preview cell where the next token will land
            const isPreviewCell = isHovered && !cell;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onMouseEnter={() => setHoveredColumn(colIndex)} // Track hovered column
                onClick={() => dropToken(colIndex)} // Drop token when clicked
                className={`${styles.cell} 
                  ${cell === 'Red' ? styles.red : ''} 
                  ${cell === 'Yellow' ? styles.yellow : ''} 
                  ${isWinningCell ? (winner === 'Red' ? styles.winningCell + ' ' + styles.red : styles.winningCell + ' ' + styles.yellow) : ''} 
                  ${isPreviewCell ? styles.hoverPreview : ''} 
                  ${!isPreviewCell && !isHovered ? styles.cellHover : ''}`} // Apply scaling only when it's not the preview cell
              />
            );
          })
        )}
      </div>
      <Button onClick={resetGame} className={styles.resetButton}>
        Reset Game
      </Button>
    </div>
  );
};

export default ConnectFour;
