import { CellState, Direction } from './types';
import { GRID_SIZE, START_POSITION, END_POSITION } from './constants';
import { getPipeExits } from './pipeConnections';
import { getOppositeDirection, getNextPosition } from './directions';

const isValidPosition = (row: number, col: number): boolean => 
  row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE;

const canConnect = (
  fromCell: CellState,
  toCell: CellState,
  direction: Direction
): boolean => {
  const fromExits = getPipeExits(fromCell);
  const toExits = getPipeExits(toCell);
  return fromExits.includes(direction) && 
         toExits.includes(getOppositeDirection(direction));
};

export const findConnectedPipes = (board: CellState[][]): CellState[][] => {
  const newBoard = board.map(row => 
    row.map(cell => ({ ...cell, isConnected: false }))
  );
  
  const visited = new Set<string>();
  const connected = new Set<string>();
  
  const dfs = (row: number, col: number, fromDir?: Direction): boolean => {
    const key = `${row},${col}`;
    if (visited.has(key)) return connected.has(key);
    visited.add(key);
    
    // Check if we reached the end
    if (row === END_POSITION[0] && col === END_POSITION[1]) {
      if (!fromDir || canConnect(board[row][col], board[row][col], fromDir)) {
        connected.add(key);
        return true;
      }
      return false;
    }
    
    const currentCell = board[row][col];
    const exits = getPipeExits(currentCell);
    
    // Try each possible direction
    for (const dir of exits) {
      if (fromDir && dir === getOppositeDirection(fromDir)) continue;
      
      const [nextRow, nextCol] = getNextPosition(row, col, dir);
      if (!isValidPosition(nextRow, nextCol)) continue;
      
      const nextCell = board[nextRow][nextCol];
      if (!canConnect(currentCell, nextCell, dir)) continue;
      
      if (dfs(nextRow, nextCol, getOppositeDirection(dir))) {
        connected.add(key);
        return true;
      }
    }
    
    return false;
  };
  
  // Start from the beginning
  dfs(START_POSITION[0], START_POSITION[1]);
  
  // Mark connected pipes
  connected.forEach(key => {
    const [row, col] = key.split(',').map(Number);
    newBoard[row][col].isConnected = true;
  });
  
  return newBoard;
};