'use client'
// pages/login.js
import { Backdrop, Box, Button, CircularProgress, Container, Divider, FormControl, Grid, TextField, Typography, styled } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import hairdresserImg from './matrix.jpg'
import { containerStyle } from '@/components/containerstyle';
import { useAuth } from '@/components/use-auth';
import StyledTextField from '@/components/StyledTextfield';


const LoginPage = () => {
  const router = useRouter();
  const [showPin, setShowPin] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [user, setuser] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, loggedIn } = useAuth();

  const submit = async () => {
    if (user === '' || password === '') {
      alert('Bitte füllen Sie alle Felder aus');
      return;
    }

    try {
      setLoading(true);
      await signIn(user, password);
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  if (loggedIn) {
    router.push('/scraper');
  }

  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    }
  };

  return (
    <Container style={containerStyle}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container>
        {/* Left side with image */}
        <Grid item xs={4} >
          <Box style={{
            position: 'relative',
            width: '100%',
            height: '100vh'
          }}>
            <Image src={hairdresserImg} alt="Hairdresserimg" layout="fill" objectFit="cover" />
          </Box>
        </Grid>
        {/* Right side with login form */}
        <Grid item container xs={8} style={{
          textAlign: '-webkit-center' as 'center',
          height: '90vh',
          placeContent: 'center',
        }}>
          <Grid item width={400}>
            <Box mt={2}>
              <Typography fontWeight={900} fontSize={40} align="center">
                Signin
              </Typography>
            </Box>
            <FormControl onKeyDown={handleEnter}>
              <StyledTextField required name="user" label="User" fullWidth margin="normal" type="user" variant='filled' value={user} style={{ fontWeight: "500 !important" }} onChange={(e) => setuser(e.target.value)} />
              <StyledTextField required name="password" label="Password" fullWidth margin="normal" type="password" variant='filled' value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button onClick={submit} size='large' variant="contained" color="primary" style={{ margin: 50 }} >
                Signin
              </Button>
            </FormControl>
            <Divider />
            <Typography align="center" mt={2} style={{ marginTop: 50 }}>
              If you are new to this, please contact <a href="mailto:office@pixxel.solutions">office@pixxel.solutions</a>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;