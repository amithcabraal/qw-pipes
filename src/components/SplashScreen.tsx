import React from 'react';
import { X } from 'lucide-react';

interface SplashScreenProps {
  onDismiss: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onDismiss }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-4 relative">
        <button 
          onClick={onDismiss}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold text-blue-800 mb-4">How to Play</h2>
        
        <div className="space-y-4 text-gray-600">
          <p>
            Connect the pipes from the top to the bottom of the grid to win!
          </p>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Game Rules:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Click on pipes to rotate them</li>
              <li>Create a continuous path from top to bottom</li>
              <li>Connected pipes will light up in blue</li>
              <li>The game is won when you create a complete path</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Pipe Types:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Straight pipes: Connect two opposite sides</li>
              <li>Corner pipes: Connect two adjacent sides</li>
            </ul>
          </div>
        </div>
        
        <button
          onClick={onDismiss}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg 
            transition-colors duration-200"
        >
          Start Playing
        </button>
      </div>
    </div>
  );
};