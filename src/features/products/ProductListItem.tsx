import React from 'react';
import { Avatar, Typography, Box } from '@mui/material';
import { Product } from '../../context/CartContext';

interface ProductListItemProps {
  product: Product;
  isViewing: boolean;
  isInCart: boolean;
  onView: (id: number) => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product, isViewing, isInCart, onView }) => (
  <Box
    className="keap-list-item"
    style={{
      background: isViewing ? 'var(--keap-primary-light)' : isInCart ? '#e3f2fd' : undefined,
      borderLeft: isViewing ? '4px solid #1976d2' : isInCart ? '4px solid var(--keap-primary)' : '4px solid transparent',
      cursor: 'pointer',
      transition: 'background 0.2s',
    }}
    onClick={() => onView(product.id)}
  >
    <Avatar src={product.image} alt={product.name} className="keap-list-avatar" />
    <div className="keap-list-text">
      <Typography fontWeight={600}>{product.name}</Typography>
      <Typography variant="body2" color="text.secondary">${product.price.toFixed(2)}</Typography>
    </div>
    {isInCart && (
      <span className="keap-list-badge" style={{ background: 'var(--keap-primary)' }}>In Cart</span>
    )}
  </Box>
);

export default ProductListItem;
