import { CellState } from './types';
import { GRID_SIZE } from './constants';

// Generate a random pipe type and rotation
function generateRandomPipe(): CellState {
  return {
    type: Math.random() > 0.5 ? 'straight' : 'corner',
    rotation: (Math.floor(Math.random() * 4) * 90) as 0 | 90 | 180 | 270,
    isConnected: false
  };
}

export const generateBoard = (): CellState[][] => {
  const board: CellState[][] = [];

  // Generate completely random board
  for (let row = 0; row < GRID_SIZE; row++) {
    const newRow: CellState[] = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      newRow.push(generateRandomPipe());
    }
    board.push(newRow);
  }

  return board;
};