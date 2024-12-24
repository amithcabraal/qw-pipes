import { Direction } from './types';
import { GRID_SIZE } from './constants';

// Get the next position in a given direction
export function getNextPosition(row: number, col: number, direction: Direction): [number, number] {
  switch (direction) {
    case 'up': return [row - 1, col];
    case 'down': return [row + 1, col];
    case 'left': return [row, col - 1];
    case 'right': return [row, col + 1];
  }
}

// Check if position is within grid
export function isValidPosition(row: number, col: number): boolean {
  return row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE;
}