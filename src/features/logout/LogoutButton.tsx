import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { IconButton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    // <KeapButton
    //   variant="outlined"
    //   sx={{ ml: 2, fontWeight: 600, color: '#34A853', borderColor: '#34A853', minWidth: 90 }}
    //   onClick={handleLogout}
    // >
    //   Logout
    // </KeapButton>
     <Tooltip title="Logout" placement="top">
      <IconButton
        onClick={handleLogout}
        sx={{
          bgcolor: '#fff',
          color: '#34A853',
          borderRadius: '50%',
          p: 1,
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          '&:hover': {
            bgcolor: '#f1f1f1',
          },
        }}
      >
        <LogoutIcon />
      </IconButton>
    </Tooltip>
  );
};

export default LogoutButton;
