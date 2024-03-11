import React, { useEffect } from "react";

interface PaddleProps {
  boardWidth: number;
  paddleX: number;
  paddleY: number;
  setPaddleX: React.Dispatch<React.SetStateAction<number>>;
}

const Paddle: React.FC<PaddleProps> = ({
  boardWidth,
  setPaddleX,
  paddleX,
  paddleY,
}) => {
  const paddleWidth = 24;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      console.log("Key pressed:", e.key);
      if (e.key === "ArrowLeft") {
        setPaddleX((prevX) => Math.max(0, prevX - 10));
      } else if (e.key === "ArrowRight") {
        setPaddleX((prevX) => Math.min(boardWidth - paddleWidth, prevX + 10));
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [setPaddleX, boardWidth, paddleWidth]);

  useEffect(() => {
    console.log("Initial paddleX:", (boardWidth - paddleWidth) / 2);
  }, []);

  return (
    <div
      className="absolute w-24 h-4 mt-6 bg-white"
      style={{ left: `${paddleX}px`, top: `${paddleY}px` }}
      tabIndex={0}
    />
  );
};

export default Paddle;
