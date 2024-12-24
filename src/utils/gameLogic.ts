import { CellState } from './types';
import { GRID_SIZE, START_POSITION, END_POSITION } from './constants';

export const initializeBoard = (): CellState[][] => {
  const board: CellState[][] = [];

  for (let i = 0; i < GRID_SIZE; i++) {
    const row: CellState[] = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      row.push({
        type: Math.random() > 0.5 ? 'straight' : 'corner',
        rotation: (Math.floor(Math.random() * 4) * 90) as 0 | 90 | 180 | 270,
        isConnected: false
      });
    }
    board.push(row);
  }

  // Set fixed start and end pipes as vertical straight pipes
  board[START_POSITION[0]][START_POSITION[1]] = { 
    type: 'straight', 
    rotation: 0, 
    isConnected: false 
  };
  
  board[END_POSITION[0]][END_POSITION[1]] = { 
    type: 'straight', 
    rotation: 0, 
    isConnected: false 
  };

  return board;
};