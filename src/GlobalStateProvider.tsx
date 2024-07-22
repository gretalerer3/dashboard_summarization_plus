// src/GlobalStateProvider.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
interface GlobalStateContextType {
  dropdownValue: string;
  setDropdownValue: (value: string) => void;
  userInput: string;
  setUserInput: (value: string) => void;
}

// Create a context with default values
const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({ children }) => {
  const [dropdownValue, setDropdownValue] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');

  return (
    <GlobalStateContext.Provider value={{ dropdownValue, setDropdownValue, userInput, setUserInput }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the global state
export const useGlobalState = (): GlobalStateContextType => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
