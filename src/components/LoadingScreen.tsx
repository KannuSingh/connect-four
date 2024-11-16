import React from 'react';
import { Loader2 } from "lucide-react";

export function LoadingScreen() {
   return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-100 to-purple-100">
         <div className="w-full max-w-sm text-center mb-12">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Connect Four Game</h1>
            <div className="flex w-full mb-4 items-center justify-center">
               <Loader2 className="animate-spin h-8 w-8 mr-2" />
               <p className="text-lg text-gray-600 dark:text-gray-400 font-bold">Loading...</p>
            </div>
         </div>
      </main>
   );
}
