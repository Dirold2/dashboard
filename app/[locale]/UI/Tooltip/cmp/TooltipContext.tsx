"use client";
import React, { createContext, useContext, useState } from 'react';

interface TooltipContextType {
    showTooltip: boolean;
    setShowTooltip: (value: boolean) => void;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    return (
        <TooltipContext.Provider value={{ showTooltip, setShowTooltip }}>
            {children}
        </TooltipContext.Provider>
    );
};

export const useTooltip = (): TooltipContextType => {
    const context = useContext(TooltipContext);
    if (!context) {
        throw new Error('useTooltip must be used within a TooltipProvider');
    }
    return context;
};