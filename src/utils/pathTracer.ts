import { CellState, Direction } from './types';
import { GRID_SIZE } from './constants';
import { getPipeExits } from './pipeUtils';

function getNextPosition(row: number, col: number, dir: Direction): [number, number] {
  switch (dir) {
    case 'up': return [row - 1, col];
    case 'down': return [row + 1, col];
    case 'left': return [row, col - 1];
    case 'right': return [row, col + 1];
  }
}

function getOppositeDirection(dir: Direction): Direction {
  switch (dir) {
    case 'up': return 'down';
    case 'down': return 'up';
    case 'left': return 'right';
    case 'right': return 'left';
  }
}

export function tracePath(board: CellState[][]): CellState[][] {
  const newBoard = board.map(row => row.map(cell => ({ ...cell, isConnected: false })));
  const visited = new Set<string>();

  function dfs(row: number, col: number, fromDir: Direction | null = null): boolean {
    const key = `${row},${col}`;
    if (visited.has(key)) return false;
    visited.add(key);

    const currentPipe = board[row][col];
    const exits = getPipeExits(currentPipe);

    // If we're at the bottom row, check if we can connect downward
    if (row === GRID_SIZE - 1 && exits.includes('down')) {
      newBoard[row][col].isConnected = true;
      return true;
    }

    // Try each possible exit
    for (const exit of exits) {
      // Don't go back where we came from
      if (fromDir && exit === getOppositeDirection(fromDir)) continue;

      const [nextRow, nextCol] = getNextPosition(row, col, exit);
      
      // Check if next position is valid
      if (nextRow < 0 || nextRow >= GRID_SIZE || nextCol < 0 || nextCol >= GRID_SIZE) continue;

      const nextPipe = board[nextRow][nextCol];
      const nextExits = getPipeExits(nextPipe);

      // Check if pipes can connect
      if (!nextExits.includes(getOppositeDirection(exit))) continue;

      if (dfs(nextRow, nextCol, exit)) {
        newBoard[row][col].isConnected = true;
        return true;
      }
    }

    visited.delete(key);
    return false;
  }

  // Try each pipe in the top row that connects upward
  for (let col = 0; col < GRID_SIZE; col++) {
    const startPipe = board[0][col];
    const exits = getPipeExits(startPipe);
    
    if (exits.includes('up')) {
      visited.clear();
      if (dfs(0, col)) {
        return newBoard;
      }
    }
  }

  return newBoard;
}