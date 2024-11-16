"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useAppKitAccount } from "@reown/appkit/react";
import { useApplicationContext } from '@/context/ApplicationContext';
import { ConnectFourBoard } from './ConnectFourBoard';
import { toast } from "sonner";
import { GameCard } from '../GameCard';
import { LoadingScreen } from '../LoadingScreen';
import styles from './styles.module.css';
import { useConnectFour } from '@/hooks/useConnectFour';

export function ConnectFour() {
   const [isLoading, setIsLoading] = useState(false);
   const { smartSession, clearSmartSession } = useApplicationContext();
   const {startGame} = useConnectFour();
   const { status, address } = useAppKitAccount();
   const isWalletConnected = status === "connected" || address !== undefined;
   const isWalletConnecting = status ? ["connecting", "reconnecting"].includes(status) : false;
   const grantedPermissions = smartSession?.grantedPermissions;
   const gameStarted = smartSession?.gameInfo?.gameStarted;

   const resetGame = () => {
      clearSmartSession();
   };

   async function onStartGame() {
      setIsLoading(true);
      try {
         await startGame();
      } catch (e) {
         console.warn("Error:", e);
         const errorMessage = (e as Error)?.message || "Error starting game";
         toast.error("Error", { description: errorMessage });
      } finally {
         setIsLoading(false);
      }
   }

   if (isWalletConnecting) {
      return <LoadingScreen />;
   }

   return (
      <main className={`flex min-h-screen flex-col items-center justify-center p-8 ${styles.customGradient}`} >
         <div className="w-full max-w-md text-center mb-12">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Connect Four Game</h1>
           
            {!isWalletConnected && !grantedPermissions && !isWalletConnecting && (
               <p className="text-lg text-gray-600 dark:text-gray-400 font-bold mb-4">Connect Wallet to get started.</p>
            )}
             {isWalletConnected && (
               <div className="flex w-full mb-4 items-center justify-center">
                  <w3m-button />
               </div>
            )}
            {grantedPermissions && gameStarted ? (
               <div className="flex flex-col items-center mb-4 gap-4">
                  <Button variant="destructive" onClick={resetGame}>End Game</Button>
                  <ConnectFourBoard />
               </div>
            ) : (
               <GameCard
                  isWalletConnected={isWalletConnected}
                  gameStarted={Boolean(gameStarted)}
                  isLoading={isLoading}
                  onStartGame={onStartGame}
               />
            )}
         </div>
      </main>
   );
}
