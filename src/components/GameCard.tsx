import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";

interface GameCardProps {
   isWalletConnected: boolean;
   gameStarted: boolean;
   isLoading: boolean;
   onStartGame: () => void;
}

export function GameCard({ isWalletConnected, gameStarted, isLoading, onStartGame }: GameCardProps) {
   return (
      <section className="flex flex-col items-center gap-6 py-8 px-6 max-w-xl w-full text-center">
         <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Let&apos;s Play Connect Four</h2>
         <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
            Players take turns dropping colored discs into a grid. The first to connect four discs vertically, 
            horizontally, or diagonally wins. If the grid is filled and no player has connected four discs, 
            the game ends in a tie.
         </p>

         <div className="flex w-full justify-center">
            {isWalletConnected && !gameStarted ? (
               <Button 
                  onClick={onStartGame} 
                  disabled={isLoading} 
                  className="w-full max-w-sm bg-gray-700 hover:bg-gray-600 text-white py-3"
               >
                  {isLoading ? (
                     <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Starting...
                     </>
                  ) : (
                     "Start New Game"
                  )}
               </Button>
            ) : (
               <ConnectWalletButton />
            )}
         </div>
      </section>
   );
}
