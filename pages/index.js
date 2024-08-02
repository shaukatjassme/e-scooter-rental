// pages/index.js
import React from 'react';
import Link from 'next/link';
import { Container, Typography, Button, Box, Grid } from '@mui/material';

const HomePage = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" gutterBottom>
        Welcome to the E-Scooter Rental App
      </Typography>
      <Typography variant="h5" color="textSecondary" paragraph>
        The easiest way to rent and manage e-scooters in your city.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <Link href="/auth/login" passHref>
            <Button variant="contained" color="primary" size="large">
              Login
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/auth/signup" passHref>
            <Button variant="outlined" color="primary" size="large">
              Sign Up
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
