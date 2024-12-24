import React from 'react';

interface WaterFlowProps {
  id: string;
}

export const WaterFlow: React.FC<WaterFlowProps> = ({ id }) => (
  <defs>
    <linearGradient id={`water-${id}`} gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#60A5FA">
        <animate
          attributeName="offset"
          values="-1; 1"
          dur="2s"
          repeatCount="indefinite"
        />
      </stop>
      <stop offset="50%" stopColor="#93C5FD">
        <animate
          attributeName="offset"
          values="0; 2"
          dur="2s"
          repeatCount="indefinite"
        />
      </stop>
    </linearGradient>
  </defs>
);