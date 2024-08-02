// pages/auth/signup.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signUp } from '../../utils/auth';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';

const SignupPage = () => {
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
      const { user, error } = await signUp(values.email, values.password);
      if (error) {
        alert(error.message); // Consider using a UI element to show errors
      } else {
        alert('Signup successful!');
        window.location.href = '/auth/login'; // Redirect to the login page or another appropriate route
      }
    },
  });

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Sign Up
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
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default SignupPage;
