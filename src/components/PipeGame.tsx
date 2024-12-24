import React, { useState, useEffect } from 'react';
import { RotateCw } from 'lucide-react';
import { PipeCell } from './PipeCell';
import { generateBoard } from '../utils/boardGenerator';
import { tracePath } from '../utils/pathTracer';
import { GRID_SIZE } from '../utils/constants';
import { SplashScreen } from './SplashScreen';

export const PipeGame: React.FC = () => {
  const [gameBoard, setGameBoard] = useState(() => generateBoard());
  const [isComplete, setIsComplete] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const checkWinCondition = (board: CellState[][]) => {
    const hasConnectedTop = board[0].some(cell => cell.isConnected);
    const hasConnectedBottom = board[GRID_SIZE - 1].some(cell => cell.isConnected);
    return hasConnectedTop && hasConnectedBottom;
  };

  useEffect(() => {
    const updatedBoard = tracePath(gameBoard);
    setGameBoard(updatedBoard);
    setIsComplete(checkWinCondition(updatedBoard));
  }, []);

  const rotatePipe = (row: number, col: number) => {
    const newBoard = gameBoard.map(r => [...r]);
    const cell = newBoard[row][col];
    cell.rotation = ((cell.rotation + 90) % 360) as 0 | 90 | 180 | 270;
    
    const updatedBoard = tracePath(newBoard);
    setGameBoard(updatedBoard);
    setIsComplete(checkWinCondition(updatedBoard));
  };

  const startNewGame = () => {
    const newBoard = generateBoard();
    setGameBoard(newBoard);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4">
      {showSplash && <SplashScreen onDismiss={() => setShowSplash(false)} />}
      <div className="bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">QuizWordz Pipes</h1>
        <div className="grid gap-0.5 mb-6">
          {gameBoard.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-0.5">
              {row.map((cell, colIndex) => (
                <PipeCell
                  key={`${rowIndex}-${colIndex}`}
                  cell={cell}
                  onClick={() => rotatePipe(rowIndex, colIndex)}
                  position={{ row: rowIndex, col: colIndex }}
                  isComplete={isComplete}
                />
              ))}
            </div>
          ))}
        </div>
        {isComplete && (
          <div className="text-center text-green-600 font-bold text-xl">
            Congratulations! Puzzle Complete!
          </div>
        )}
        <button
          onClick={startNewGame}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg 
            flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <RotateCw size={20} />
          New Game
        </button>
      </div>
    </div>
  );
};