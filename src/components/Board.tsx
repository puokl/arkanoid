import React, { ReactNode } from "react";

interface BoardProps {
  children: ReactNode;
}

const Board: React.FC<BoardProps> = ({ children }) => {
  console.log("Board dimensions:", window.innerWidth, window.innerHeight);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black ">
      <div className="flex flex-col items-center bg-teal-500 ">{children}</div>
    </div>
  );
};

export default Board;
