import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, List, ListItem, ListItemText, Box, Divider, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import '../styles/keap-theme.css';

const sidebarLinks = [
  { text: 'Home', href: '/', icon: <HomeIcon /> },
  { text: 'Products', href: '/products', icon: <StorefrontIcon /> },
  { text: 'Cart', href: '/cart', icon: <ShoppingCartIcon /> },
  { text: 'Login', href: '/login', icon: <LoginIcon /> },
  { text: 'Register', href: '/register', icon: <PersonAddIcon /> },
];

const Navbar: React.FC<{ title?: string }> = ({ title }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const location = useLocation();

  return (
    <React.Fragment>
      {/* Sidebar */}
      <Box className="keap-sidebar" sx={{ width: { xs: 64, sm: sidebarExpanded ? 220 : 72 }, transition: 'width 0.2s', minHeight: '100vh', bgcolor: 'var(--keap-sidebar-bg)', color: 'var(--keap-sidebar-text)', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 0 }}>
        <IconButton
          onClick={() => setSidebarExpanded((prev) => !prev)}
          sx={{ color: 'var(--keap-sidebar-text)', mb: 2 }}
          size="large"
        >
          {sidebarExpanded ? <MenuIcon /> : <AddIcon />}
        </IconButton>
        <Divider sx={{ bgcolor: 'var(--keap-divider)', width: '80%', mb: 1 }} />
        <List sx={{ width: '100%' }}>
          {sidebarLinks.map((link) => (
            <Tooltip title={sidebarExpanded ? '' : link.text} placement="right" key={link.text}>
              <ListItem
                // button={true}
                component={RouterLink}
                to={link.href}
                className={`keap-sidebar-item${location.pathname === link.href ? ' active' : ''}`}
                sx={{
                  color: 'var(--keap-sidebar-text)',
                  justifyContent: sidebarExpanded ? 'flex-start' : 'center',
                  px: sidebarExpanded ? 2 : 0,
                  my: 0.5,
                  transition: 'background 0.2s',
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: { xs: 18, md: 20 },
                }}
              >
                {link.icon}
                {sidebarExpanded && (
                  <ListItemText primary={link.text} sx={{ ml: 2, color: 'var(--keap-sidebar-text)' }} />
                )}
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>
      {/* AppBar */}
      {/* <AppBar position="fixed" sx={{ background: 'var(--keap-card)', color: 'var(--keap-primary)', boxShadow: '0 2px 8px rgba(30, 125, 96, 0.08)', zIndex: 1201, left: sidebarExpanded ? 220 : 72, width: `calc(100% - ${sidebarExpanded ? 220 : 72}px)`, transition: 'left 0.2s, width 0.2s' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: 'var(--keap-primary)' }}>
            {title || 'buy-nest'}
          </Typography>
        </Toolbar>
      </AppBar> */}
      {/* <Toolbar /> */}
       {/* Spacer for fixed AppBar */}
    </React.Fragment>
  );
};

export default Navbar;
