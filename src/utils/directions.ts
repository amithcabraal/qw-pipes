import { Direction } from './types';

export const getOppositeDirection = (dir: Direction): Direction => {
  switch (dir) {
    case 'up': return 'down';
    case 'down': return 'up';
    case 'left': return 'right';
    case 'right': return 'left';
  }
};

export const getNextPosition = (row: number, col: number, direction: Direction): [number, number] => {
  switch (direction) {
    case 'up': return [row - 1, col];
    case 'down': return [row + 1, col];
    case 'left': return [row, col - 1];
    case 'right': return [row, col + 1];
  }
};