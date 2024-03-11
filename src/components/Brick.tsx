import React from "react";

interface BrickProps {
  color: number;
  x: number;
  y: number;
  active: boolean;
}

export const BRICK_ENERGY: { [key: number]: number } = {
  1: 1, // Red brick
  2: 1, // Green brick
  3: 2, // Yellow brick
  4: 2, // Blue brick
  5: 3, // Purple brick
};

const Brick: React.FC<BrickProps> = ({ color, x, y, active }) => {
  const getBrickColorClass = (color: number): string => {
    switch (color) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-green-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-blue-500";
      case 5:
        return "bg-purple-500";
      default:
        return "";
    }
  };

  const brickColorClass = getBrickColorClass(color);

  const brickStyle = {
    left: `${x}px`,
    top: `${y}px`,
  };

  if (!active) {
    return null;
  }
  return (
    <div
      className={`absolute w-16 h-8 border border-black ${brickColorClass}`}
      style={brickStyle}
    />
  );
};

export default Brick;
