import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useLanguage } from '../hooks/useLanguage';
import { useNokiaStore } from '../store/useNokiaStore';

// 标准俄罗斯方块形状定义 - 基于GitHub最佳实践
const TETROMINOS = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: '#00f0f0'
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: '#f0f000'
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#a000f0'
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    color: '#00f000'
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    color: '#f00000'
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#0000f0'
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#f0a000'
  }
};

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const INITIAL_SPEED = 1000;
const SPEED_INCREASE = 50;

interface Piece {
  shape: number[][];
  x: number;
  y: number;
  type: string;
  color: string;
}

interface GameState {
  board: number[][];
  currentPiece: Piece | null;
  nextPiece: string;
  ghostPiece: Piece | null;
  score: number;
  lines: number;
  level: number;
  gameOver: boolean;
  paused: boolean;
  isPlaying: boolean;
  dropTime: number;
  lastDrop: number;
}

const TetrisGame: React.FC = () => {
  const { t } = useLanguage();
  const { tetrisScore, setTetrisScore, setGameRunning, touchBlocked, setScreen } = useNokiaStore();
  
  const gameLoopRef = useRef<number>();

  // 获取随机方块类型
  function getRandomPieceType(): string {
    const types = Object.keys(TETROMINOS);
    return types[Math.floor(Math.random() * types.length)];
  }

  // 创建新方块
  const createPiece = useCallback((type: string): Piece => {
    const tetromino = TETROMINOS[type as keyof typeof TETROMINOS];
    return {
      shape: tetromino.shape.map(row => [...row]),
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(tetromino.shape[0].length / 2),
      y: 0,
      type,
      color: tetromino.color
    };
  }, []);

  // 初始化游戏状态
  const initializeGame = useCallback((): GameState => {
    const firstPieceType = getRandomPieceType();
    const firstPiece = createPiece(firstPieceType);
    const nextPiece = getRandomPieceType();
    const board = Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0));
    
    return {
       board,
       currentPiece: firstPiece,
       nextPiece,
       ghostPiece: null, // 先设为null，后面计算
       score: 0,
       lines: 0,
       level: 1,
       gameOver: false,
       paused: false,
       isPlaying: false,
       dropTime: INITIAL_SPEED,
       lastDrop: Date.now()
     };
  }, [createPiece]);

  const [gameState, setGameState] = useState<GameState>(() => initializeGame());

  // 检查碰撞
  const checkCollision = useCallback((piece: Piece, board: number[][], dx = 0, dy = 0): boolean => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x] !== 0) {
          const newX = piece.x + x + dx;
          const newY = piece.y + y + dy;
          
          // 边界检查
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return true;
          }
          
          // 与已放置方块的碰撞检查
          if (newY >= 0 && board[newY][newX] !== 0) {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  // 计算幽灵方块位置
  const calculateGhostPiece = useCallback((piece: Piece, board: number[][]): Piece => {
    let ghostY = piece.y;
    while (!checkCollision({ ...piece, y: ghostY + 1 }, board)) {
      ghostY++;
    }
    return { ...piece, y: ghostY };
  }, [checkCollision]);

  // 初始化幽灵方块位置
  useEffect(() => {
    if (gameState.currentPiece && !gameState.ghostPiece) {
      const ghost = calculateGhostPiece(gameState.currentPiece, gameState.board);
      setGameState(prev => ({
        ...prev,
        ghostPiece: ghost
      }));
    }
  }, [gameState.currentPiece, gameState.ghostPiece, gameState.board, calculateGhostPiece]);

  // 旋转方块 - 使用矩阵转置+翻转算法
  const rotatePiece = useCallback((shape: number[][]): number[][] => {
    const rows = shape.length;
    const cols = shape[0].length;
    
    // 转置矩阵
    const transposed = Array(cols).fill(null).map(() => Array(rows).fill(0));
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        transposed[j][i] = shape[i][j];
      }
    }
    
    // 顺时针旋转：翻转每一行
    return transposed.map(row => row.reverse());
  }, []);

  // 将方块放置到棋盘
  const placePiece = useCallback((piece: Piece, board: number[][]): number[][] => {
    const newBoard = board.map(row => [...row]);
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x] !== 0) {
          const boardY = piece.y + y;
          const boardX = piece.x + x;
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            newBoard[boardY][boardX] = piece.shape[y][x];
          }
        }
      }
    }
    
    return newBoard;
  }, []);

  // 清除完整的行
  const clearLines = useCallback((board: number[][]): { newBoard: number[][]; linesCleared: number } => {
    const newBoard = board.filter(row => row.some(cell => cell === 0));
    const linesCleared = BOARD_HEIGHT - newBoard.length;
    
    // 在顶部添加新的空行
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }
    
    return { newBoard, linesCleared };
  }, []);

  // 移动方块
  const movePiece = useCallback((dx: number, dy: number) => {
    if (gameState.gameOver || gameState.paused || !gameState.currentPiece) return;
    
    if (!checkCollision(gameState.currentPiece, gameState.board, dx, dy)) {
      setGameState(prev => {
        const newPiece = prev.currentPiece ? {
          ...prev.currentPiece,
          x: prev.currentPiece.x + dx,
          y: prev.currentPiece.y + dy
        } : null;
        
        return {
          ...prev,
          currentPiece: newPiece,
          ghostPiece: newPiece ? calculateGhostPiece(newPiece, prev.board) : null
        };
      });
    } else if (dy > 0) {
      // 方块无法继续下落，放置方块
      const newBoard = placePiece(gameState.currentPiece, gameState.board);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      
      // 标准俄罗斯方块计分系统
      let lineScore = 0;
      switch (linesCleared) {
        case 1: lineScore = 40; break;
        case 2: lineScore = 100; break;
        case 3: lineScore = 300; break;
        case 4: lineScore = 1200; break; // Tetris!
      }
      
      const newScore = gameState.score + lineScore * gameState.level;
      const newLines = gameState.lines + linesCleared;
      const newLevel = Math.floor(newLines / 10) + 1;
      const newDropTime = Math.max(50, INITIAL_SPEED - (newLevel - 1) * SPEED_INCREASE);
      
      const nextPiece = createPiece(gameState.nextPiece);
      const gameOver = checkCollision(nextPiece, clearedBoard);
      
      setGameState(prev => ({
        ...prev,
        board: clearedBoard,
        currentPiece: gameOver ? null : nextPiece,
        nextPiece: getRandomPieceType(),
        ghostPiece: gameOver ? null : calculateGhostPiece(nextPiece, clearedBoard),
        score: newScore,
        lines: newLines,
        level: newLevel,
        dropTime: newDropTime,
        gameOver,
        isPlaying: !gameOver
      }));
      
      // 保存最高分
      if (gameOver && newScore > tetrisScore) {
        setTetrisScore(newScore);
      }
    }
  }, [gameState, checkCollision, placePiece, clearLines, createPiece, calculateGhostPiece, tetrisScore, setTetrisScore]);

  // 旋转当前方块（带墙踢）
  const rotatePieceAction = useCallback(() => {
    if (gameState.gameOver || gameState.paused || !gameState.currentPiece) return;
    
    const rotatedShape = rotatePiece(gameState.currentPiece.shape);
    const rotatedPiece = { ...gameState.currentPiece, shape: rotatedShape };
    
    // 墙踢测试（Wall Kick）
    const kickTests = [
      { x: 0, y: 0 },   // 原位置
      { x: -1, y: 0 },  // 左移一格
      { x: 1, y: 0 },   // 右移一格
      { x: 0, y: -1 },  // 上移一格
      { x: -1, y: -1 }, // 左上
      { x: 1, y: -1 }   // 右上
    ];
    
    for (const kick of kickTests) {
      const testPiece = {
        ...rotatedPiece,
        x: rotatedPiece.x + kick.x,
        y: rotatedPiece.y + kick.y
      };
      
      if (!checkCollision(testPiece, gameState.board)) {
        setGameState(prev => ({
          ...prev,
          currentPiece: testPiece,
          ghostPiece: calculateGhostPiece(testPiece, prev.board)
        }));
        return;
      }
    }
  }, [gameState, rotatePiece, checkCollision, calculateGhostPiece]);

  // 硬降落
  const hardDrop = useCallback(() => {
    if (gameState.gameOver || gameState.paused || !gameState.currentPiece) return;
    
    let dropDistance = 0;
    while (!checkCollision(gameState.currentPiece, gameState.board, 0, dropDistance + 1)) {
      dropDistance++;
    }
    
    if (dropDistance > 0) {
      const droppedPiece = {
        ...gameState.currentPiece,
        y: gameState.currentPiece.y + dropDistance
      };
      
      // 立即放置方块
      const newBoard = placePiece(droppedPiece, gameState.board);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      
      let lineScore = 0;
      switch (linesCleared) {
        case 1: lineScore = 40; break;
        case 2: lineScore = 100; break;
        case 3: lineScore = 300; break;
        case 4: lineScore = 1200; break;
      }
      
      const newScore = gameState.score + lineScore * gameState.level + dropDistance * 2;
      const newLines = gameState.lines + linesCleared;
      const newLevel = Math.floor(newLines / 10) + 1;
      const newDropTime = Math.max(50, INITIAL_SPEED - (newLevel - 1) * SPEED_INCREASE);
      
      const nextPiece = createPiece(gameState.nextPiece);
      const gameOver = checkCollision(nextPiece, clearedBoard);
      
      setGameState(prev => ({
        ...prev,
        board: clearedBoard,
        currentPiece: gameOver ? null : nextPiece,
        nextPiece: getRandomPieceType(),
        ghostPiece: gameOver ? null : calculateGhostPiece(nextPiece, clearedBoard),
        score: newScore,
        lines: newLines,
        level: newLevel,
        dropTime: newDropTime,
        gameOver,
        isPlaying: !gameOver
      }));
    }
  }, [gameState, checkCollision, placePiece, clearLines, createPiece, calculateGhostPiece, tetrisScore, setTetrisScore]);

  // 开始游戏
  const startGame = useCallback(() => {
    const firstPiece = createPiece(gameState.nextPiece);
    const emptyBoard = Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0));
    
    setGameState(prev => ({
      ...prev,
      board: emptyBoard,
      currentPiece: firstPiece,
      nextPiece: getRandomPieceType(),
      ghostPiece: calculateGhostPiece(firstPiece, emptyBoard),
      score: 0,
      lines: 0,
      level: 1,
      gameOver: false,
      paused: false,
      isPlaying: true,
      dropTime: INITIAL_SPEED,
      lastDrop: Date.now()
    }));
  }, [createPiece, gameState.nextPiece, calculateGhostPiece]);

  // 暂停/继续游戏
  const togglePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      paused: !prev.paused,
      lastDrop: prev.paused ? Date.now() : prev.lastDrop
    }));
  }, []);

  // 键盘控制
  useKeyboardNavigation({
    maxIndex: 0,
    onEnter: () => {
      if (gameState.gameOver) {
        startGame();
      } else if (!gameState.isPlaying) {
        startGame();
      } else {
        togglePause();
      }
    },
    onBack: () => setScreen('games'),
    customHandlers: {
      'ArrowLeft': () => movePiece(-1, 0),
      'ArrowRight': () => movePiece(1, 0),
      'ArrowDown': () => movePiece(0, 1),
      'ArrowUp': rotatePieceAction,
      ' ': hardDrop,
      'a': () => movePiece(-1, 0),
      'A': () => movePiece(-1, 0),
      'd': () => movePiece(1, 0),
      'D': () => movePiece(1, 0),
      's': () => movePiece(0, 1),
      'S': () => movePiece(0, 1),
      'w': rotatePieceAction,
      'W': rotatePieceAction
    }
  });

  // 游戏循环
  useEffect(() => {
    if (gameState.gameOver || gameState.paused) {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
      return;
    }
    
    const gameLoop = () => {
      const now = Date.now();
      if (now - gameState.lastDrop >= gameState.dropTime) {
        movePiece(0, 1);
        setGameState(prev => ({ ...prev, lastDrop: now }));
      }
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState.gameOver, gameState.paused, gameState.dropTime, gameState.lastDrop, movePiece]);

  // 获取方块颜色
  const getCellColor = (cell: number, isGhost = false) => {
    if (cell === 0) return 'bg-black';
    
    if (isGhost) {
      return 'border-2 border-gray-400 bg-gray-100 bg-opacity-30';
    }
    
    // 根据方块类型返回颜色 - 使用更饱和的颜色
    const colorMap: { [key: number]: string } = {
      1: 'bg-cyan-500 shadow-inner',    // I - 青色
      2: 'bg-yellow-500 shadow-inner',  // O - 黄色
      3: 'bg-purple-600 shadow-inner',  // T - 紫色
      4: 'bg-green-500 shadow-inner',   // S - 绿色
      5: 'bg-red-600 shadow-inner',     // Z - 红色
      6: 'bg-blue-600 shadow-inner',    // J - 蓝色
      7: 'bg-orange-500 shadow-inner'   // L - 橙色
    };
    
    return colorMap[cell] || 'bg-gray-500 shadow-inner';
  };

  // 渲染游戏板
  const renderBoard = () => {
    const displayBoard = gameState.board.map(row => [...row]);
    
    // 绘制幽灵方块
    if (gameState.ghostPiece && gameState.currentPiece) {
      for (let y = 0; y < gameState.ghostPiece.shape.length; y++) {
        for (let x = 0; x < gameState.ghostPiece.shape[y].length; x++) {
          if (gameState.ghostPiece.shape[y][x] !== 0) {
            const boardY = gameState.ghostPiece.y + y;
            const boardX = gameState.ghostPiece.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              if (displayBoard[boardY][boardX] === 0) {
                displayBoard[boardY][boardX] = -1; // 特殊值表示幽灵方块
              }
            }
          }
        }
      }
    }
    
    // 绘制当前方块
    if (gameState.currentPiece) {
      for (let y = 0; y < gameState.currentPiece.shape.length; y++) {
        for (let x = 0; x < gameState.currentPiece.shape[y].length; x++) {
          if (gameState.currentPiece.shape[y][x] !== 0) {
            const boardY = gameState.currentPiece.y + y;
            const boardX = gameState.currentPiece.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = gameState.currentPiece.shape[y][x];
            }
          }
        }
      }
    }
    
    return (
      <div className="inline-grid grid-cols-10 gap-0 border-3 border-gray-800 bg-gray-50 shadow-lg max-h-full">
        {displayBoard.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`aspect-square ${
                cell === -1 
                  ? getCellColor(1, true) // 幽灵方块
                  : getCellColor(cell)
              }`}
              style={{
                width: 'min(4vw, 2rem)',
                height: 'min(4vw, 2rem)',
                border: cell !== 0 ? '0.5px solid rgba(0, 0, 0, 0.4)' : '0.5px solid rgba(200, 200, 200, 0.2)',
                boxSizing: 'border-box'
              }}
            />
          ))
        )}
      </div>
    );
  };

  // 渲染下一个方块
  const renderNextPiece = () => {
    const tetromino = TETROMINOS[gameState.nextPiece as keyof typeof TETROMINOS];
    
    // 计算方块的实际边界，去掉空白行和列
    const shape = tetromino.shape;
    let minRow = shape.length, maxRow = -1;
    let minCol = shape[0].length, maxCol = -1;
    
    // 找到方块的实际边界
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          minRow = Math.min(minRow, y);
          maxRow = Math.max(maxRow, y);
          minCol = Math.min(minCol, x);
          maxCol = Math.max(maxCol, x);
        }
      }
    }
    
    // 提取实际的方块部分
    const trimmedShape = [];
    for (let y = minRow; y <= maxRow; y++) {
      const row = [];
      for (let x = minCol; x <= maxCol; x++) {
        row.push(shape[y][x]);
      }
      trimmedShape.push(row);
    }
    
    const cols = maxCol - minCol + 1;
    
    return (
      <div className="flex flex-col items-center justify-center p-2 min-h-[80px]">
        <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {trimmedShape.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${y}-${x}`}
                className={`aspect-square shadow-sm ${
                  cell !== 0 ? getCellColor(cell) : ''
                }`}
                style={{
                  width: 'min(3vw, 1.5rem)',
                  height: 'min(3vw, 1.5rem)',
                  border: cell !== 0 ? '0.5px solid rgba(0, 0, 0, 0.4)' : 'none',
                  boxSizing: 'border-box'
                }}
              />
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen max-h-screen bg-[#9BBB58] text-black font-mono flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 text-center py-1 border-b border-[#666666]">
        <div className="text-lg font-bold">{t.tetris || '俄罗斯方块'}</div>
      </div>

      {/* Game Area */}
      <div className="flex-1 min-h-0 p-1 flex gap-2 overflow-hidden">
        {/* Game Board */}
        <div className="flex-1 flex items-center justify-center min-w-0">
          <div className="w-fit h-fit">
            {renderBoard()}
          </div>
        </div>
        
        {/* Side Panel */}
        <div className="w-28 space-y-1 flex-shrink-0">
          
          {/* Next Piece */}
          <div className="text-center">
            <div className="text-xs font-bold mb-1">{t.next || '下一个'}</div>
            {renderNextPiece()}
          </div>
          
          {/* Score */}
          <div className="text-xs space-y-0.5">
            <div><strong>{t.score || '得分'}:</strong> {gameState.score}</div>
            <div><strong>{t.lines || '行数'}:</strong> {gameState.lines}</div>
            <div><strong>{t.level || '等级'}:</strong> {gameState.level}</div>
          </div>
          
          {/* Status */}
          <div className="text-xs text-center">
            {gameState.gameOver ? (
              <div className="text-red-600 font-bold">{t.gameOver || '游戏结束'}</div>
            ) : gameState.paused ? (
              <div className="text-blue-600 font-bold">{t.pause || '已暂停'}</div>
            ) : (
              <div className="text-green-600 font-bold">{t.gamePlayingHint || '游戏中'}</div>
            )}
          </div>
          
          {/* Instructions */}
          <div className="text-xs space-y-0 border-t border-[#666666] pt-1 leading-tight">
            <div>{t.moveBlock || '方向键: 移动方块'}</div>
            <div>{t.rotateBlock || '上箭头: 旋转方块'}</div>
            <div>{t.fastDrop || '下箭头: 快速下降'}</div>
            <div>{t.hardDrop || '空格键: 硬降落'}</div>
            <div>{t.backToMenu || 'ESC: 返回菜单'}</div>
          </div>
          
          {/* Game Status Hint */}
          <div className="text-xs text-center border-t border-[#666666] pt-1">
            {gameState.gameOver ? (
              <div className="font-bold text-red-800">{t.gameOverHint || '游戏结束! 按确认键重新开始'}</div>
            ) : gameState.paused ? (
              <div className="font-bold">{t.gamePausedHint || '游戏已暂停 - 按确认键继续'}</div>
            ) : !gameState.isPlaying ? (
              <div className="font-bold">{t.gameStartHint || '按确认键开始游戏'}</div>
            ) : (
              <div>{t.gamePlayingHint || '游戏进行中'}</div>
            )}
          </div>
        </div>
      </div>

      {/* Soft Keys */}
      <div className="flex-shrink-0 flex justify-between px-4 py-2 text-xs border-t border-[#666666]">
        <div 
          className={`text-left cursor-pointer ${
            !touchBlocked ? 'hover:bg-[#7A9B42] hover:text-white' : ''
          } px-3 py-2 rounded transition-colors duration-150 flex items-center`}
          onClick={() => {
            if (touchBlocked) return;
            if (gameState.gameOver) {
              startGame();
            } else if (!gameState.isPlaying) {
              startGame();
            } else {
              togglePause();
            }
          }}
        >
          <div className="font-bold">
            {gameState.gameOver ? (t.restartGame || '再来一局') : !gameState.isPlaying ? (t.startGame || '开始') : gameState.paused ? (t.continueGame || '继续') : (t.pauseGame || '暂停')}
          </div>
        </div>
        <div 
          className={`text-right cursor-pointer ${
            !touchBlocked ? 'hover:bg-[#7A9B42] hover:text-white' : ''
          } px-3 py-2 rounded transition-colors duration-150 flex items-center`}
          onClick={() => {
            if (touchBlocked) return;
            setScreen('games');
          }}
        >
          <div className="font-bold">{t.exitGame || '退出'}</div>
        </div>
      </div>
    </div>
  );
};

export default TetrisGame;