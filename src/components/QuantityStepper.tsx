import React from 'react';
import { Box, Typography } from '@mui/material';
import KeapButton from './KeapButton';

interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (newValue: number) => void;
  size?: 'small' | 'medium';
}

const QuantityStepper: React.FC<QuantityStepperProps> = ({ value, min = 1, max = 99, onChange, size = 'small' }) => {
  // Use smaller size for + and - buttons
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <KeapButton
        variant="outlined"
        sx={{
          minWidth: 24,
          width: 24,
          height: 24,
          px: 0,
          fontWeight: 700,
          fontSize: 16,
          borderRadius: '50%',
          boxShadow: 'none',
          border: '1.5px solid var(--keap-primary)',
          color: 'var(--keap-primary)',
          '&:hover': {
            bgcolor: 'var(--keap-primary)',
            color: '#fff',
            border: '1.5px solid var(--keap-primary)',
          },
        }}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        -
      </KeapButton>
      <Typography sx={{ minWidth: 20, textAlign: 'center', fontWeight: 700, fontSize: 16, mx: 0.5, border: '1px solid var(--keap-primary)', borderRadius: 2, bgcolor: '#fff', px: 1, py: 0.25, fontFamily: 'inherit' }}>
        {value}
      </Typography>
      <KeapButton
        variant="outlined"
        sx={{
          minWidth: 24,
          width: 24,
          height: 24,
          px: 0,
          fontWeight: 700,
          fontSize: 16,
          borderRadius: '50%',
          boxShadow: 'none',
          border: '1.5px solid var(--keap-primary)',
          color: 'var(--keap-primary)',
          '&:hover': {
            bgcolor: 'var(--keap-primary)',
            color: '#fff',
            border: '1.5px solid var(--keap-primary)',
          },
        }}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        +
      </KeapButton>
    </Box>
  );
};

export default QuantityStepper;
