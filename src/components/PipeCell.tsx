import React from 'react';
import { type CellState } from '../utils/gameLogic';
import { WaterFlow } from './WaterFlow';

interface PipeCellProps {
  cell: CellState;
  onClick: () => void;
  position: { row: number; col: number };
  isComplete: boolean;
}

export const PipeCell: React.FC<PipeCellProps> = ({ cell, onClick, position, isComplete }) => {
  const cellId = `${position.row}-${position.col}`;
  
  const getPipeSvg = () => {
    const strokeColor = cell.isConnected 
      ? isComplete ? `url(#water-${cellId})` : '#3B82F6'
      : '#9CA3AF';
      
    switch (cell.type) {
      case 'straight':
        return (
          <path
            d="M32 0v64"
            stroke={strokeColor}
            strokeWidth="12"
            strokeLinecap="round"
          />
        );
      case 'corner':
        return (
          <path
            d="M32 0v32h32"
            stroke={strokeColor}
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
        );
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className="w-16 h-16 bg-gray-50 rounded-lg border-2 border-gray-200 
        hover:border-blue-300 transition-all duration-200 transform hover:scale-105 p-0"
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        style={{ transform: `rotate(${cell.rotation}deg)` }}
      >
        {isComplete && cell.isConnected && <WaterFlow id={cellId} />}
        {getPipeSvg()}
      </svg>
    </button>
  );
}