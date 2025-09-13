"use client";

import React, { createContext, useContext, useState } from "react";

// Create context for loading state
const TransitionContext = createContext();

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
};

const TransitionProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  // Custom loading function that can be called from components
  const startLoading = (message = "Loading...") => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
    setLoadingMessage("Loading...");
  };

  // Removed complex router overrides - using RouteLoadingWrapper instead

  const contextValue = {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading
  };

  return (
    <TransitionContext.Provider value={contextValue}>
      {isLoading && (
        <div className="fixed inset-0 bg-[#fef7e6] bg-opacity-95 backdrop-blur-sm z-[9999] flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center">
            <div className="flex items-center justify-center space-x-1 mb-4">
              <div className="w-3 h-3 bg-my-green rounded-full dot-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-my-green rounded-full dot-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-my-green rounded-full dot-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <p className="text-gray-700 font-medium dot-pulse">{loadingMessage}</p>
          </div>
        </div>
      )}
      {children}
    </TransitionContext.Provider>
  );
};

export default TransitionProvider;
