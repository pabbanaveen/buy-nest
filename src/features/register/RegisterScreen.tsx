import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import KeapButton from '../../components/KeapButton';
import { ProductImageSlider } from '../../components/ProductImageSlider';
import KeapCard from '../../components/KeapCard';
import '../../styles/keap-theme.css';

const sliderImages = [
  require('../../assets/images/istockphoto-584866442-612x612.jpg'),
  require('../../assets/images/istockphoto-837336346-612x612.jpg'),
  require('../../assets/images/istockphoto-938463764-612x612.jpg'),
];

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // On mount, load users from users.json if not in localStorage
  useEffect(() => {
    if (!localStorage.getItem('users')) {
      fetch('/users.json')
        .then(res => res.json())
        .then(data => localStorage.setItem('users', JSON.stringify(data || [])))
        .catch(() => localStorage.setItem('users', '[]'));
    }
  }, []);

  const handleRegister = async () => {
    setError('');
    setSuccess('');
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find((u: any) => u.email === email)) {
        setError('Email already registered.');
        return;
      }
      users.push({ name, email, password });
      localStorage.setItem('users', JSON.stringify(users));
      setSuccess('Registration successful! You can now log in.');
      setName(''); setEmail(''); setPassword('');
    } catch (e) {
      setError('Registration failed.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, bgcolor: 'var(--keap-bg)' }}>
      {/* Left: Registration Form in KeapCard for consistency */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', px: { xs: 2, md: 8 }, py: 6, bgcolor: '#fff' }}>
        <KeapCard sx={{ width: '100%', maxWidth: 400, mx: 'auto', p: { xs: 3, md: 4 }, borderRadius: 'var(--keap-border-radius)', boxShadow: 'var(--keap-shadow)' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, fontFamily: 'Inter, Segoe UI, Arial, sans-serif', mb: 1 }}>Register</Typography>
          <Typography sx={{ mb: 2, color: '#222', fontSize: 16 }}>
            Already have a Buy nest account? <a href="/login" style={{ color: 'var(--keap-primary)', fontWeight: 600, textDecoration: 'none' }}>Log in</a>
          </Typography>
          <TextField label="Name*" fullWidth sx={{ mb: 2 }} value={name} onChange={e => setName(e.target.value)} />
          <TextField label="Email*" fullWidth sx={{ mb: 2 }} value={email} onChange={e => setEmail(e.target.value)} />
          <TextField label="Password*" type="password" fullWidth sx={{ mb: 2 }} value={password} onChange={e => setPassword(e.target.value)} />
          {error && <Typography sx={{ color: 'red', mb: 1 }}>{error}</Typography>}
          {success && <Typography sx={{ color: 'green', mb: 1 }}>{success}</Typography>}
          <KeapButton fullWidth sx={{ mb: 2, fontSize: 18, py: 1.5 }} onClick={handleRegister}>Register</KeapButton>
          <Button variant="outlined" fullWidth sx={{ mb: 2, fontWeight: 600, fontSize: 16, color: '#222', borderColor: '#222', textTransform: 'none' }} startIcon={<img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google" style={{ width: 22, height: 22 }} />}>Sign up with Google</Button>
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

export default RegisterScreen;
