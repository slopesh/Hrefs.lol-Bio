import React from 'react';

interface ImageBackgroundProps {
  url: string; // URL of the background image
  size?: string; // CSS background-size property (e.g., 'cover', 'contain', 'auto')
  position?: string; // CSS background-position property (e.g., 'center', 'top left')
  repeat?: string; // CSS background-repeat property (e.g., 'no-repeat', 'repeat')
}

const ImageBackground: React.FC<ImageBackgroundProps> = ({
  url,
  size = 'cover',
  position = 'center',
  repeat = 'no-repeat',
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: `url(${url})`,
        backgroundSize: size,
        backgroundPosition: position,
        backgroundRepeat: repeat,
      }}
      className="image-background" // Add a class for potential additional styling
    >
      {/* No children needed for a simple image background */}
    </div>
  );
};

export default ImageBackground; 