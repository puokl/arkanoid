import React, { useState, useEffect } from "react";
import Board from "./Board";
import Paddle from "./Paddle";
import Ball from "./Ball";
import Brick from "./Brick";
import levels from "../levels.json";

interface BrickInfo {
  x: number;
  y: number;
  width: number;
  height: number;
  color: number;
  active: boolean;
}

const Game: React.FC = () => {
  const currentLevel = levels[0];
  const boardWidth = 1440;
  const boardHeight = 754;
  const paddleWidth = 24;
  //   const paddleX = 12;
  const paddleY = 700;
  const paddleHeight = 2;

  const [paddleX, setPaddleX] = useState<number>(
    (boardWidth - paddleWidth) / 2
  );
  const [gameStarted, setGameStarted] = useState(false);

  const initializeBricks = (tiles: number[][]): BrickInfo[] => {
    const bricks: BrickInfo[] = [];
    const brickWidth = 80;
    const brickHeight = 40;

    for (let rowIndex = 0; rowIndex < tiles.length; rowIndex++) {
      for (
        let brickIndex = 0;
        brickIndex < tiles[rowIndex].length;
        brickIndex++
      ) {
        const x =
          (boardWidth - tiles[rowIndex].length * brickWidth) / 2 +
          brickIndex * brickWidth;
        const y = rowIndex * brickHeight;

        bricks.push({
          x,
          y,
          width: brickWidth,
          height: brickHeight,
          color: tiles[rowIndex][brickIndex],
          active: tiles[rowIndex][brickIndex] !== 0,
        });
      }
    }

    return bricks;
  };

  const [bricks, setBricks] = useState(() =>
    initializeBricks(currentLevel.tiles)
  );
  useEffect(() => {
    if (gameStarted) {
      // TODO: Start the game logic, e.g., move the paddle, handle input, etc.
    }
  }, [gameStarted]);
  return (
    <div className="relative w-screen h-screen max-w-screen-md max-h-screen-md">
      <Board>
        {/* {currentLevel.tiles.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((brickColor, brickIndex) => (
              <Brick key={brickIndex} color={brickColor}/>
            ))}
          </div>
        ))} */}
        {bricks.map((brick, index) => {
          console.log(`Brick ${index + 1} - X: ${brick.x}, Y: ${brick.y}`);

          return (
            <Brick
              key={index}
              color={brick.color}
              x={brick.x}
              y={brick.y}
              active={brick.active}
            />
          );
        })}

        <Ball
          boardWidth={boardWidth}
          boardHeight={boardHeight}
          paddleX={paddleX}
          paddleWidth={paddleWidth}
          paddleHeight={paddleHeight}
          gameStarted={gameStarted}
          setGameStarted={setGameStarted}
        />
        <Paddle
          boardWidth={boardWidth}
          setPaddleX={setPaddleX}
          paddleX={paddleX}
          paddleY={paddleY}
        />
      </Board>
      <button className="bg-teal-500" onClick={() => setGameStarted(true)}>
        Start Game
      </button>
    </div>
  );
};

export default Game;
