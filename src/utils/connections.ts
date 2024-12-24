import { CellState, Direction } from './types';
import { GRID_SIZE } from './constants';

// Get the connection points for a pipe based on its type and rotation
export function getPipeConnections(pipe: CellState): Direction[] {
  if (pipe.type === 'straight') {
    return pipe.rotation === 0 || pipe.rotation === 180 
      ? ['up', 'down'] 
      : ['left', 'right'];
  }
  
  // Corner pipe connections
  switch (pipe.rotation) {
    case 0: return ['up', 'right'];
    case 90: return ['right', 'down'];
    case 180: return ['down', 'left'];
    case 270: return ['left', 'up'];
  }
}

// Check if two adjacent pipes connect
function pipesConnect(pipe1: CellState, pipe2: CellState, direction: Direction): boolean {
  const pipe1Connections = getPipeConnections(pipe1);
  const pipe2Connections = getPipeConnections(pipe2);
  
  switch (direction) {
    case 'up':
      return pipe1Connections.includes('up') && pipe2Connections.includes('down');
    case 'down':
      return pipe1Connections.includes('down') && pipe2Connections.includes('up');
    case 'left':
      return pipe1Connections.includes('left') && pipe2Connections.includes('right');
    case 'right':
      return pipe1Connections.includes('right') && pipe2Connections.includes('left');
  }
}

// Check if position is within grid bounds
function isValidPosition(row: number, col: number): boolean {
  return row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE;
}

// Trace path from start to end
export function tracePath(board: CellState[][]): CellState[][] {
  const newBoard = board.map(row => row.map(cell => ({ ...cell, isConnected: false })));
  const visited = new Set<string>();
  
  function trace(row: number, col: number): boolean {
    const key = `${row},${col}`;
    if (visited.has(key)) return newBoard[row][col].isConnected;
    visited.add(key);
    
    const currentPipe = board[row][col];
    const connections = getPipeConnections(currentPipe);
    
    // Mark current pipe as connected
    newBoard[row][col].isConnected = true;
    
    // Check each connection direction
    for (const dir of connections) {
      let nextRow = row;
      let nextCol = col;
      
      switch (dir) {
        case 'up': nextRow--; break;
        case 'down': nextRow++; break;
        case 'left': nextCol--; break;
        case 'right': nextCol++; break;
      }
      
      if (!isValidPosition(nextRow, nextCol)) continue;
      
      const nextPipe = board[nextRow][nextCol];
      if (pipesConnect(currentPipe, nextPipe, dir)) {
        if (trace(nextRow, nextCol)) {
          return true;
        }
      }
    }
    
    // If we can't proceed, unmark this pipe
    newBoard[row][col].isConnected = false;
    return false;
  }
  
  // Start tracing from the start position (0,2)
  trace(0, 2);
  
  return newBoard;
}