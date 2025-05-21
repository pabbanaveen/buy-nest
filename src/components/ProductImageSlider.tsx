import { Box } from '@mui/system';
import React from 'react';

export const ProductImageSlider: React.FC<{ images: string[] }> = ({ images }) => {
  const [index, setIndex] = React.useState(0);
  const [hovering, setHovering] = React.useState(false);

  // Auto-slide effect
  React.useEffect(() => {
    if (hovering) return; // pause auto-slide when hovering

    const timer = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(timer);
  }, [images.length, hovering]);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <img
        src={images[index]}
        alt="Product"
        style={{
          borderRadius: 24,
          width: 320,
          height: 320,
          objectFit: 'cover',
          boxShadow: '0 2px 8px rgba(30, 125, 96, 0.08)',
          transition: 'opacity 0.5s ease-in-out',
        }}
      />
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        {images.map((img, i) => (
          <Box
            key={i}
            sx={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              bgcolor: i === index ? 'var(--keap-primary)' : 'var(--keap-divider)',
              cursor: 'pointer',
              border: i === index ? '2px solid var(--keap-primary)' : '2px solid transparent',
              transition: 'all 0.2s',
            }}
            onClick={() => setIndex(i)}
          />
        ))}
      </Box>
    </Box>
  );
};
