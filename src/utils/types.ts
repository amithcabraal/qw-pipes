export type Direction = 'up' | 'down' | 'left' | 'right';

export interface CellState {
  type: 'straight' | 'corner';
  rotation: 0 | 90 | 180 | 270;
  isConnected: boolean;
}