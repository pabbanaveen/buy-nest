import React from 'react';
import { Box, Typography, TextField, Button, Divider } from '@mui/material';
import KeapButton from '../../components/KeapButton';
import { ProductImageSlider } from '../../components/ProductImageSlider';
import '../../styles/keap-theme.css';
import KeapCard from '../../components/KeapCard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext'; 

const sliderImages = [
  require('../../assets/images/istockphoto-1226208399-612x612.jpg'),
  require('../../assets/images/istockphoto-1339264709-612x612.jpg'),
  require('../../assets/images/istockphoto-171224469-612x612.jpg'),
];

const LoginScreen: React.FC = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // On mount, load users from users.json if not in localStorage
  useEffect(() => {
    if (!localStorage.getItem('users')) {
      fetch('/users.json')
        .then(res => res.json())
        .then(data => localStorage.setItem('users', JSON.stringify(data || [])))
        .catch(() => localStorage.setItem('users', '[]'));
    }
  }, []);

  const getJSONDataFromUsersJSON = async () => {
    try {
      const response = await fetch('/users.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      localStorage.setItem('users', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const handleLogin = () => {
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    // get users from /users.json
    getJSONDataFromUsersJSON();
    // const usersInUsersJSON = JSON.
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (user) {
      // localStorage.setItem('auth', 'true');
       login(); 
      navigate('/home');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, bgcolor: 'var(--keap-bg)' }}>
      {/* Left: Login Form in KeapCard for consistency */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', px: { xs: 2, md: 8 }, py: 6, bgcolor: '#fff' }}>
        <KeapCard sx={{ width: '100%', maxWidth: 400, mx: 'auto', p: { xs: 51, md: 4 }, borderRadius: 'var(--keap-border-radius)', boxShadow: 'var(--keap-shadow)' }}>
          {/* <img src="/logo192.png" alt="Keap Logo" style={{ width: 90, marginBottom: 24 }} /> */}
          <Typography variant="h3" sx={{ fontWeight: 700, fontFamily: 'Inter, Segoe UI, Arial, sans-serif', mb: 1 }}>Log in</Typography>
          <Typography sx={{ mb: 2, color: '#222', fontSize: 16 }}>
            Don't have a Buy nest account? <a href="/register" style={{ color: 'var(--keap-primary)', fontWeight: 600, textDecoration: 'none' }}>Register</a>
          </Typography>
          <TextField label="Email*" fullWidth sx={{ mb: 2 }} value={email} onChange={e => setEmail(e.target.value)} />
          <TextField label="Password*" type="password" fullWidth sx={{ mb: 2 }} value={password} onChange={e => setPassword(e.target.value)} />
          {error && <Typography sx={{ color: 'red', mb: 1 }}>{error}</Typography>}
          <KeapButton fullWidth sx={{ mb: 2, fontSize: 18, py: 1.5 }} onClick={handleLogin}>Log in</KeapButton>
          <Button variant="outlined" fullWidth sx={{ mb: 2, fontWeight: 600, fontSize: 16, color: '#222', borderColor: '#222', textTransform: 'none' }} startIcon={<img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google" style={{ width: 22, height: 22 }} />}>Log in with Google</Button>
          <Typography sx={{ mt: 1, mb: 1, color: 'var(--keap-primary)', fontWeight: 600, fontSize: 15, alignSelf: 'flex-start' }}>
            Forgot your password?
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 1, alignSelf: 'flex-start' }}>
            <a href="#" style={{ color: '#222', fontSize: 14 }}>Need help?</a>
            <a href="#" style={{ color: '#222', fontSize: 14 }}>Privacy policy</a>
          </Box>
        </KeapCard>
      </Box>
      {/* Right: Image Slider & Marketing */}
      <Box sx={{ flex: 1.2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', px: { xs: 2, md: 8 }, py: 6, bgcolor: 'var(--keap-bg)' }}>
        <Box sx={{ width: '100%', maxWidth: 420, mb: 4 }}>
          <ProductImageSlider images={sliderImages} />
        </Box>
        <Button variant="outlined" sx={{ borderRadius: 8, px: 4, py: 1.5, fontWeight: 600, fontSize: 18, borderColor: '#222', color: '#222', textTransform: 'none' }}>Join Waitlist</Button>
      </Box>
    </Box>
  );
};

export default LoginScreen;
