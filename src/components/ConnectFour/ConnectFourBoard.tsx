import React from 'react';
import { Button } from "@/components/ui/button";
import { useConnectFour } from '@/hooks/useConnectFour';
import styles from './styles.module.css';

export function ConnectFourBoard() {
   const { board, currentPlayer, winner, dropToken, resetGame, winningCells, hoveredColumn, setHoveredColumn, getHoverRow } = useConnectFour();

   return (
      <div className={styles.connectFourContainer}>
         <h1 className={styles.title}>Connect Four</h1>
         <h2 className={styles.currentPlayer}>Current Player: {currentPlayer}</h2>
         {winner && <h2 className={styles.winner}>Winner! 🎉 {winner}</h2>}
         <div
            className={styles.board}
            onMouseLeave={() => setHoveredColumn(null)}
         >
            {board.map((row, rowIndex) =>
               row.map((cell, colIndex) => {
                  const hoverRow = hoveredColumn === colIndex ? getHoverRow(colIndex) : null;
                  const isHovered = hoverRow === rowIndex;
                  const isWinningCell = winningCells?.some(([winRow, winCol]) => winRow === rowIndex && winCol === colIndex);
                  const isPreviewCell = isHovered && !cell;

                  return (
                     <div
                        key={`${rowIndex}-${colIndex}`}
                        onMouseEnter={() => setHoveredColumn(colIndex)}
                        onClick={() => dropToken(colIndex)}
                        className={`${styles.cell} 
                           ${cell === 'Red' ? styles.red : ''} 
                           ${cell === 'Yellow' ? styles.yellow : ''} 
                           ${isWinningCell ? styles.winningCell : ''} 
                           ${isPreviewCell ? styles.hoverPreview : ''}`}
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
}
