import React from 'react';

interface HalftoneWavesBackgroundProps {
  color1: string; // Base color
  color2: string; // Wave color
  amplitude: number; // Amplitude of the waves (controls height)
  frequency: number; // Frequency of the waves (controls number of waves/density)
  speed: number; // Animation speed (controls duration)
}

const HalftoneWavesBackground: React.FC<HalftoneWavesBackgroundProps> = ({
  color1,
  color2,
  amplitude,
  frequency,
  speed,
}) => {
  // Basic SVG wave path generation
  const generateWavePath = (amp: number, freq: number, width: number, height: number) => {
    let pathData = `M0 ${height / 2}`;
    for (let i = 0; i <= width; i++) {
      const x = i;
      const y = height / 2 + amp * Math.sin((x / width) * Math.PI * freq);
      pathData += ` L${x} ${y}`;
    }
    pathData += ` L${width} ${height} L0 ${height} Z`;
    return pathData;
  };

  // Using static values for SVG dimensions for simplicity, can be made dynamic
  const svgWidth = 1000;
  const svgHeight = 400;

  const wavePath = generateWavePath(amplitude, frequency, svgWidth, svgHeight);

  // Define a CSS animation for wave movement
  const waveAnimation = `
    @keyframes wave-move {
      0% { transform: translateX(0); }
      100% { transform: translateX(-${svgWidth / 2}px); } /* Move half the SVG width */
    }
  `;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: color1,
        overflow: 'hidden', // Hide overflowing parts of the SVG during animation
        position: 'relative',
      }}
    >
      <style>{waveAnimation}</style> {/* Inject keyframes */}
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        preserveAspectRatio="xMidYMid slice" // Scale to cover the container
        style={
          {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '200%', // Make SVG wider than container to allow seamless loop
            height: '100%',
            animation: `wave-move ${speed}s linear infinite`, // Apply animation
            fill: color2, // Apply wave color
            opacity: 0.6, // Add some transparency
          } as React.CSSProperties // Cast to CSSProperties to satisfy TypeScript
        }
      >
        <path d={wavePath} />
         {/* Optionally add more paths for layered waves */}
      </svg>
    </div>
  );
};

export default HalftoneWavesBackground; 