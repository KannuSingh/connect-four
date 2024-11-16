"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { CONNECT_FOUR_APP_DATA, removeItem } from "../utils/LocalStorage";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { SmartSessionGrantPermissionsResponse } from "@reown/appkit-experimental/smart-session";

// Define the GameState interface to represent the Connect Four game state
export interface GameState {
  board: (string | null)[][];
  isXNext: boolean;
  winner: string | null;
  winningLine: number[][] | null;
  gameId: string | null;
}

interface ApplicationContextType {
  projectId: string;
  smartSession:
    | {
        grantedPermissions: SmartSessionGrantPermissionsResponse;
        gameInfo: {
          gameState: GameState;
          gameStarted: boolean;
        } | undefined;
      }
    | undefined;
  setSmartSession: React.Dispatch<
    React.SetStateAction<
      | {
          grantedPermissions: SmartSessionGrantPermissionsResponse;
          gameInfo: {
            gameState: GameState;
            gameStarted: boolean;
          } | undefined;
        }
      | undefined
    >
  >;
  clearSmartSession: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

export function ApplicationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const projectId = process.env["NEXT_PUBLIC_PROJECT_ID"];
  if (!projectId) {
    throw new Error("NEXT_PUBLIC_PROJECT_ID is not set");
  }

  // Load the smart session data from localStorage
  const [smartSession, setSmartSession] = useLocalStorageState<
    | {
        grantedPermissions: SmartSessionGrantPermissionsResponse;
        gameInfo: {
          gameState: GameState;
          gameStarted: boolean;
        } | undefined;
      }
    | undefined
  >(CONNECT_FOUR_APP_DATA, undefined);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to clear the smart session from localStorage and context
  function clearSmartSession() {
    removeItem(CONNECT_FOUR_APP_DATA);
    setSmartSession(undefined);
  }

  return (
    <ApplicationContext.Provider
      value={{
        projectId,
        smartSession,
        setSmartSession,
        clearSmartSession,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

// Hook to use the ApplicationContext in components
export function useApplicationContext() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      "useApplicationContext must be used within a ApplicationContextProvider"
    );
  }

  return context;
}
