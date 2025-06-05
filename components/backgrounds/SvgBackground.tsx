import React from 'react';

interface SvgBackgroundProps {
  code: string; // Raw SVG code as a string
}

const SvgBackground: React.FC<SvgBackgroundProps> = ({ code }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        // The SVG itself should handle scaling and positioning via its viewBox and preserveAspectRatio attributes
      }}
      className="svg-background" // Add a class for potential additional styling
      dangerouslySetInnerHTML={{ __html: code }} // Render the raw SVG code
    />
  );
};

export default SvgBackground; 