import { Direction } from './types';
import { GRID_SIZE } from './constants';

// Get the next position in a given direction
export function getNextPosition(row: number, col: number, dir: Direction): [number, number] {
  switch (dir) {
    case 'up': return [row - 1, col];
    case 'down': return [row + 1, col];
    case 'left': return [row, col - 1];
    case 'right': return [row, col + 1];
  }
}

// Check if a position is within the grid
export function isValidPosition(row: number, col: number): boolean {
  return row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE;
}

// Get the opposite direction
export function getOppositeDirection(dir: Direction): Direction {
  switch (dir) {
    case 'up': return 'down';
    case 'down': return 'up';
    case 'left': return 'right';
    case 'right': return 'left';
  }
}