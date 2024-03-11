import React, { useEffect, useState, useRef } from "react";

interface BallProps {
  boardWidth: number;
  boardHeight: number;
  paddleX: number;
  paddleWidth: number;
  paddleHeight: number;
  gameStarted: boolean;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const Ball: React.FC<BallProps> = ({
  boardWidth,
  boardHeight,
  paddleX,
  paddleWidth,
  paddleHeight,
  gameStarted,
  setGameStarted,
}) => {
  const ballSize = 10;
  const initialSpeed = 5;
  const lastUpdateTime = useRef(Date.now());

  // how often the ball's position is visually updated
  const renderInterval = 16;

  //  how often collisions are checked
  const collisionDetectionInterval = 8;

  const [ballPosition, setBallPosition] = useState({
    x: boardWidth / 2 - 18,
    y: 400,
  });

  const [ballDirection, setBallDirection] = useState({ x: 1, y: -1 });
  const [ballSpeed, setBallSpeed] = useState(initialSpeed);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showGameOverPopup, setShowGameOverPopup] = useState(false);

  const handleWallCollision = () => {
    if (ballPosition.x <= 0 || ballPosition.x >= boardWidth - ballSize) {
      setBallDirection((prevDirection) => ({
        ...prevDirection,
        x: -prevDirection.x,
      }));
    }

    if (ballPosition.y <= 0) {
      setBallDirection((prevDirection) => ({
        ...prevDirection,
        y: -prevDirection.y,
      }));
    }

    if (ballPosition.y >= boardHeight) {
      // Ball went below the board
      setIsGameOver(true);
    }
  };

  const handlePaddleCollision = () => {
    // console.log("no if stetement");
    console.log("PADDLEX", paddleX);
    if (
      ballPosition.x + ballSize >= paddleX &&
      ballPosition.x <= paddleX + paddleWidth &&
      ballPosition.y + ballSize >= boardHeight - paddleHeight
    ) {
      console.log("Paddle Position X: ", paddleX);
      // console.log("Paddle Position Y: ", paddleY);
      // console.log("Ball Position x: ", ballPosition.x);
      // console.log("Ball Position y: ", ballPosition.y);
      setBallDirection((prevDirection) => ({
        ...prevDirection,
        y: -prevDirection.y,
      }));
    }
  };

  const handleBrickCollision = () => {};

  const handleGameOver = () => {
    console.log("Game Over!");
    setShowGameOverPopup(true);
    resetGame();
    setGameStarted(false);
  };

  const resetGame = () => {
    setBallPosition({
      x: boardWidth / 2 - 18,
      y: 400,
    });
    setBallDirection({ x: 1, y: -1 });
    setIsGameOver(false);
  };

  useEffect(() => {
    console.log("Ball component rendered");
    if (gameStarted) {
      const moveBall = setInterval(() => {
        console.log("Moving ball");
        setBallPosition((prevPosition) => {
          // console.log("Previous Position:", prevPosition);
          const newPosition = {
            x: prevPosition.x + ballSpeed * ballDirection.x,
            y: prevPosition.y + ballSpeed * ballDirection.y,
          };
          console.log("New Position:", newPosition);
          return newPosition;
        });
      }, 8);

      return () => {
        clearInterval(moveBall);
      };
    }
  }, [gameStarted, ballSpeed, ballDirection]);

  useEffect(() => {
    // console.log("Checking collisions");
    handleWallCollision();
    handlePaddleCollision();
    handleBrickCollision();
    if (isGameOver) {
      handleGameOver();
    }
  }, [
    ballPosition,
    boardWidth,
    boardHeight,
    paddleX,
    paddleWidth,
    paddleHeight,
  ]);

  return (
    <div>
      {showGameOverPopup && (
        <div className="game-over-popup">
          <p>Game Over!</p>
          <button onClick={() => setShowGameOverPopup(false)}>Restart</button>
        </div>
      )}
      <div
        className="absolute z-20 w-10 h-10 bg-white rounded-full"
        style={{
          left: `${ballPosition.x}px`,
          top: `${ballPosition.y}px`,
          border: "1px solid red",
        }}
      />
    </div>
  );
};

export default Ball;
