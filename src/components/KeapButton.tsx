import React, { ElementType, ReactNode } from 'react';
import { Button, ButtonProps, LinkProps } from '@mui/material';

export interface KeapButtonProps extends Omit<ButtonProps, 'component' | 'href'> {
  children: ReactNode;
  className?: string;
  component?: ElementType; // allow React Router's `Link`
  to?: string;             // for routing
}
const KeapButton: React.FC<KeapButtonProps> = ({ children, sx, className, ...rest }) => (
  <Button
    className={`keap-btn${className ? ' ' + className : ''}`}
    sx={{
      bgcolor: rest.variant === 'outlined' ? 'transparent' : 'var(--keap-primary)',
      color: rest.variant === 'outlined' ? 'var(--keap-primary)' : 'var(--keap-on-primary)',
      borderRadius: 'var(--keap-border-radius)',
      boxShadow: 'var(--keap-shadow)',
      textTransform: 'none',
      fontWeight: 600,
      border: rest.variant === 'outlined' ? '1.5px solid var(--keap-primary)' : undefined,
      transition: 'background 0.2s, color 0.2s, border 0.2s',
      '&:hover': {
        bgcolor: 'var(--keap-primary)',
        color: '#fff',
        border: '1.5px solid var(--keap-primary)',
        boxShadow: 'var(--keap-shadow-hover)',
      },
      ...sx,
    }}
    disableElevation
    {...rest}
  >
    {children}
  </Button>
);

export default KeapButton;
