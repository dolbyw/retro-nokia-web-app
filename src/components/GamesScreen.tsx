import React from 'react';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useLanguage } from '../hooks/useLanguage';
import { useNokiaStore } from '../store/useNokiaStore';

interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const GamesScreen: React.FC = () => {
  const { t } = useLanguage();
  const { touchBlocked, setScreen, snakeScore, tetrisScore } = useNokiaStore();
  
  const games: Game[] = [
    {
      id: 'snake',
      name: t.snakeGame,
      description: t.classicSnakeGame,
      icon: '🐍'
    },
    {
      id: 'tetris',
      name: t.tetris,
      description: t.classicTetrisGame || '经典俄罗斯方块',
      icon: '🧱'
    },
  ];

  const handleGameClick = (index: number) => {
    if (touchBlocked) return;
    
    const game = games[index];
    if (game.id === 'snake') {
      setScreen('snake-game');
    } else if (game.id === 'tetris') {
      setScreen('tetris-game');
    }
  };

  const { selectedIndex } = useKeyboardNavigation({
    maxIndex: games.length,
    onEnter: () => {
      const game = games[selectedIndex];
      if (game.id === 'snake') {
        setScreen('snake-game');
      } else if (game.id === 'tetris') {
        setScreen('tetris-game');
      }
    }
  });

  const renderGameIcon = (type: string) => {
    switch (type) {
      case '🐍': // Snake
        return (
          <div className="w-12 h-12 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" className="fill-black">
              <rect x="4" y="8" width="4" height="4" />
              <rect x="8" y="8" width="4" height="4" />
              <rect x="12" y="8" width="4" height="4" />
              <rect x="16" y="8" width="4" height="4" />
              <rect x="16" y="12" width="4" height="4" />
              <rect x="2" y="6" width="2" height="2" />
              <rect x="2" y="10" width="2" height="2" />
            </svg>
          </div>
        );
      case '🧱': // Tetris
        return (
          <div className="w-12 h-12 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" className="fill-black">
              <rect x="6" y="6" width="3" height="3" />
              <rect x="9" y="6" width="3" height="3" />
              <rect x="12" y="6" width="3" height="3" />
              <rect x="9" y="9" width="3" height="3" />
              <rect x="6" y="15" width="3" height="3" />
              <rect x="9" y="15" width="3" height="3" />
              <rect x="12" y="15" width="3" height="3" />
              <rect x="15" y="15" width="3" height="3" />
            </svg>
          </div>
        );
      default:
        return <div className="w-12 h-12"></div>;
    }
  };

  return (
    <div className="h-full bg-[#9BBB58] text-black font-mono flex flex-col">
      {/* Header */}
      <div className="text-center py-3 border-b border-[#666666]">
        <div className="text-lg font-bold">{t.gamesTitle}</div>
        <div className="text-xs mt-1">{t.selectGameToPlay}</div>
      </div>

      {/* Games List */}
      <div className="flex-1 overflow-hidden p-4">
        <div className="space-y-3">
          {games.map((game, index) => (
            <div
              key={game.id}
              className={`
                p-4 border-2 border-[#666666] flex items-center
                ${selectedIndex === index ? 'bg-[#7A9B42] border-black' : 'bg-[#9BBB58]'}
                ${(game.id === 'snake' || game.id === 'tetris') ? 'cursor-pointer' : 'opacity-60'}
                ${!touchBlocked && (game.id === 'snake' || game.id === 'tetris') ? 'hover:bg-[#7A9B42]' : ''}
                transition-colors duration-150
              `}
              onClick={() => handleGameClick(index)}
            >
              <div className="mr-4">
                {renderGameIcon(game.icon)}
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg mb-1">{game.name}</div>
                <div className="text-xs">{game.description}</div>
                {game.id !== 'snake' && game.id !== 'tetris' && (
                  <div className="text-xs mt-1 opacity-75">{t.notAvailable}</div>
                )}
              </div>
              <div className="text-lg">
                {selectedIndex === index ? '►' : ''}
              </div>
            </div>
          ))}
        </div>

        {/* High Scores */}
        <div className="mt-6 border border-[#666666] p-3">
          <div className="text-sm font-bold mb-2">{t.highScores}</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>{t.snakeGame}:</span>
              <span>{snakeScore > 0 ? snakeScore.toString() : '---'}</span>
            </div>
            <div className="flex justify-between">
              <span>{t.tetris}:</span>
              <span>{tetrisScore > 0 ? tetrisScore.toString() : '---'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Instructions */}
      <div className="px-4 py-2 border-t border-[#666666]">
        <div className="text-center text-xs space-y-1">
          <div>{t.useArrowKeysToNavigate}</div>
          <div>{t.pressEnterToStart}</div>
        </div>
      </div>

      {/* Soft Keys */}
      <div className="flex justify-between px-4 py-2 text-xs border-t border-[#666666]">
        <div 
          className={`text-left cursor-pointer ${
            !touchBlocked ? 'hover:bg-[#7A9B42] hover:text-white' : ''
          } px-2 py-1 rounded transition-colors duration-150`}
          onClick={() => {
            if (touchBlocked) return;
            // Simulate Enter key press
            const game = games[selectedIndex];
            if (game && game.id === 'snake') {
              setScreen('snake-game');
            } else if (game && game.id === 'tetris') {
              setScreen('tetris-game');
            }
          }}
        >
          <div className="font-bold">{t.play}</div>
        </div>
        <div 
          className={`text-right cursor-pointer ${
            !touchBlocked ? 'hover:bg-[#7A9B42] hover:text-white' : ''
          } px-2 py-1 rounded transition-colors duration-150`}
          onClick={() => {
            if (touchBlocked) return;
            setScreen('menu');
          }}
        >
          <div className="font-bold">{t.back}</div>
        </div>
      </div>
    </div>
  );
};

export default GamesScreen;