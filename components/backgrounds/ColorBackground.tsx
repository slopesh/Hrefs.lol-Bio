import React from 'react';

interface ColorBackgroundProps {
  color: string; // CSS color value (e.g., '#ffffff', 'rgba(0,0,0,0.5)')
  isGradient?: boolean; // Whether the color value represents a gradient
  gradient?: string; // CSS gradient value (e.g., 'linear-gradient(to right, #ffffff, #000000)')
}

const ColorBackground: React.FC<ColorBackgroundProps> = ({
  color,
  isGradient = false,
  gradient,
}) => {
  const backgroundStyle = isGradient && gradient
    ? { background: gradient }
    : { backgroundColor: color };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        ...backgroundStyle,
      }}
      className="color-background" // Add a class for potential additional styling
    >
      {/* No children needed for a color background */}
    </div>
  );
};

export default ColorBackground; 