import { CellState, Direction } from './types';
import { GRID_SIZE } from './constants';

function getExits(pipe: CellState): Direction[] {
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

function getOpposite(dir: Direction): Direction {
  switch (dir) {
    case 'up': return 'down';
    case 'down': return 'up';
    case 'left': return 'right';
    case 'right': return 'left';
  }
}

function getNext(row: number, col: number, dir: Direction): [number, number] {
  switch (dir) {
    case 'up': return [row - 1, col];
    case 'down': return [row + 1, col];
    case 'left': return [row, col - 1];
    case 'right': return [row, col + 1];
  }
}

function isValid(row: number, col: number): boolean {
  return row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE;
}

// Find valid start positions in top row that connect downward
function findStartPositions(board: CellState[][]): number[] {
  return board[0].map((cell, col) => {
    const exits = getExits(cell);
    return exits.includes('down') ? col : -1;
  }).filter(col => col !== -1);
}

export function checkPath(board: CellState[][]): CellState[][] {
  const newBoard = board.map(row => row.map(cell => ({ ...cell, isConnected: false })));
  const visited = new Set<string>();
  let foundValidPath = false;

  function trace(row: number, col: number, fromDir: Direction | null = null): boolean {
    const key = `${row},${col}`;
    if (visited.has(key)) return false;
    visited.add(key);

    const pipe = board[row][col];
    const exits = getExits(pipe);

    // If we're at the bottom row, check if we can connect upward
    if (row === GRID_SIZE - 1) {
      if (exits.includes('up')) {
        foundValidPath = true;
        return true;
      }
      return false;
    }

    // Try each possible exit
    for (const exit of exits) {
      // Don't go back the way we came
      if (fromDir && exit === getOpposite(fromDir)) continue;

      const [nextRow, nextCol] = getNext(row, col, exit);
      if (!isValid(nextRow, nextCol)) continue;

      const nextPipe = board[nextRow][nextCol];
      const nextExits = getExits(nextPipe);

      // Check if pipes can connect
      if (!nextExits.includes(getOpposite(exit))) continue;

      if (trace(nextRow, nextCol, exit)) {
        newBoard[row][col].isConnected = true;
        return true;
      }
    }

    visited.delete(key);
    return false;
  }

  // Try each valid start position
  const startPositions = findStartPositions(board);
  for (const startCol of startPositions) {
    visited.clear();
    if (trace(0, startCol, 'up')) {
      // Mark the last successful path
      visited.forEach(key => {
        const [row, col] = key.split(',').map(Number);
        newBoard[row][col].isConnected = true;
      });
      break;
    }
  }

  return newBoard;
}