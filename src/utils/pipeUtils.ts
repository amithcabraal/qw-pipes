import { CellState, Direction } from './types';

// Get the exits of a pipe based on its type and rotation
export function getPipeExits(pipe: CellState): Direction[] {
  if (pipe.type === 'straight') {
    return pipe.rotation === 0 || pipe.rotation === 180 
      ? ['up', 'down'] 
      : ['left', 'right'];
  }
  
  switch (pipe.rotation) {
    case 0: return ['up', 'right'];
    case 90: return ['right', 'down'];
    case 180: return ['down', 'left'];
    case 270: return ['left', 'up'];
  }
}