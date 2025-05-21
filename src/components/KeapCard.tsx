import React from 'react';
import { Card, CardProps } from '@mui/material';

interface KeapCardProps extends CardProps {
  children: React.ReactNode;
  sx?: CardProps['sx'];
  className?: string;
}

const KeapCard: React.FC<KeapCardProps> = ({ children, sx, className, ...rest }) => (
  <Card
    className={`keap-card${className ? ' ' + className : ''}`}
    sx={{
      bgcolor: 'var(--keap-card)',
      borderRadius: 'var(--keap-border-radius)',
      boxShadow: 'var(--keap-shadow)',
      border: '1px solid var(--keap-divider)',
      ...sx,
    }}
    {...rest}
  >
    {children}
  </Card>
);

export default KeapCard;
