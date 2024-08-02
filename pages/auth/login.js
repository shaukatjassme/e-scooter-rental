// pages/auth/login.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Typography, TextField, Button, Grid, Box, Alert } from '@mui/material';
import { signIn } from '../../utils/auth';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      const { user, error } = await signIn(values.email, values.password);
      if (error) {
        alert(error.message); // Consider using a UI element to show errors
      } else {
        alert('Login successful!');
        window.location.href = '/dashboard'; // Redirect to a dashboard or another protected route
      }
    },
  });

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ mt: 3, p: 3, boxShadow: 1, borderRadius: 1, backgroundColor: 'background.paper' }}
      >
        {formik.errors.email || formik.errors.password ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formik.errors.email || formik.errors.password}
          </Alert>
        ) : null}
        <TextField
          fullWidth
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          {...formik.getFieldProps('email')}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          {...formik.getFieldProps('password')}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
