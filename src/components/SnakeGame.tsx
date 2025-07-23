import React, { useState, useEffect, useCallback } from 'react';
import { useNokiaStore } from '../store/useNokiaStore';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useLanguage } from '../hooks/useLanguage';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 15;
const INITIAL_SNAKE = [{ x: 7, y: 7 }];
const INITIAL_FOOD = { x: 10, y: 10 };
const GAME_SPEED = 200;

const SnakeGame: React.FC = () => {
  const { snakeScore, setSnakeScore, setGameRunning, touchBlocked, setScreen } = useNokiaStore();
  const { t } = useLanguage();
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);

  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection('RIGHT');
    setGameOver(false);
    setGameStarted(false);
    setScore(0);
  };

  const startGame = () => {
    resetGame();
    setGameStarted(true);
    setGameRunning(true);
  };

  useKeyboardNavigation({
    maxIndex: 1,
    customHandlers: {
      'ArrowUp': () => {
        if (gameStarted && !gameOver && direction !== 'DOWN') {
          setDirection('UP');
        }
      },
      'ArrowDown': () => {
        if (gameStarted && !gameOver && direction !== 'UP') {
          setDirection('DOWN');
        }
      },
      'ArrowLeft': () => {
        if (gameStarted && !gameOver && direction !== 'RIGHT') {
          setDirection('LEFT');
        }
      },
      'ArrowRight': () => {
        if (gameStarted && !gameOver && direction !== 'LEFT') {
          setDirection('RIGHT');
        }
      },
      'Enter': () => {
        if (!gameStarted || gameOver) {
          startGame();
        }
      },
      ' ': () => {
        if (!gameStarted || gameOver) {
          startGame();
        }
      }
    }
  });

  const endGame = useCallback(() => {
    setGameOver(true);
    setGameRunning(false);
  }, [setGameRunning]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      setSnake(currentSnake => {
        const newSnake = [...currentSnake];
        const head = { ...newSnake[0] };

        // Move head
        switch (direction) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }

        // Check wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setTimeout(() => {
            endGame();
            if (score > snakeScore) {
              setSnakeScore(score);
            }
          }, 0);
          return currentSnake;
        }

        // Check self collision
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setTimeout(() => {
            endGame();
            if (score > snakeScore) {
              setSnakeScore(score);
            }
          }, 0);
          return currentSnake;
        }

        newSnake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 10);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, GAME_SPEED);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, direction, food, score, snakeScore, setSnakeScore, endGame, generateFood]);

  const renderCell = (x: number, y: number) => {
    const isSnake = snake.some(segment => segment.x === x && segment.y === y);
    const isFood = food.x === x && food.y === y;
    const isHead = snake[0] && snake[0].x === x && snake[0].y === y;

    let cellClass = 'w-4 h-4 border border-[#666666] ';
    
    if (isFood) {
      cellClass += 'bg-black';
    } else if (isHead) {
      cellClass += 'bg-[#333333]';
    } else if (isSnake) {
      cellClass += 'bg-[#555555]';
    } else {
      cellClass += 'bg-[#9BBB58]';
    }

    return <div key={`${x}-${y}`} className={cellClass} />;
  };

  return (
    <div className="h-full bg-[#9BBB58] text-black font-mono flex flex-col">
      {/* Header */}
      <div className="text-center py-3 border-b border-[#666666]">
        <div className="text-lg font-bold">{t.snakeGame}</div>
        <div className="text-xs mt-1">
          {t.score}: {score} | {t.highScore}: {snakeScore}
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="border-2 border-black bg-[#9BBB58] p-2">
          <div className="grid grid-cols-15 gap-0">
            {Array.from({ length: GRID_SIZE }, (_, y) =>
              Array.from({ length: GRID_SIZE }, (_, x) => renderCell(x, y))
            )}
          </div>
        </div>
      </div>

      {/* Game Status */}
      <div className="px-4 py-2 border-t border-[#666666]">
        <div className="text-center text-xs space-y-1">
          {!gameStarted && (
            <div className="font-bold">{t.pressEnterToStart}</div>
          )}
          {gameStarted && !gameOver && (
            <div>{t.useArrowKeysToMove}</div>
          )}
          {gameOver && (
            <div className="font-bold text-red-800">{t.gameOver}! {t.pressEnterToRestart}</div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="px-4 py-2 border-t border-[#666666]">
        <div className="text-center text-xs space-y-1">
          <div>{t.arrowKeys}: {t.moveSnake}</div>
          <div>ESC: {t.backToGamesMenu}</div>
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
            // Start or restart game
            if (!gameStarted || gameOver) {
              startGame();
            }
          }}
        >
          <div className="font-bold">{gameStarted && !gameOver ? t.playing : t.start}</div>
        </div>
        <div 
          className={`text-right cursor-pointer ${
            !touchBlocked ? 'hover:bg-[#7A9B42] hover:text-white' : ''
          } px-2 py-1 rounded transition-colors duration-150`}
          onClick={() => {
            if (touchBlocked) return;
            setScreen('games');
          }}
        >
          <div className="font-bold">{t.back}</div>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;