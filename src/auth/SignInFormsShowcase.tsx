import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SignInFormEmailCode } from 'src/auth/SignInFormEmailCode';

export function SignInFormsShowcase() {
  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: '100vh', px: 2, backgroundColor: '#e3f2fd' }} // light blue background for the whole page
    >
      <Grid item xs={12} sm={10} md={6}>
        <Paper elevation={3} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3 }}>
          <Stack
            direction="row"
            sx={{ alignItems: 'baseline', justifyContent: 'space-between', mb: 3 }}
          >
            <Typography variant="h3" color="#0d47a1">
              Login
            </Typography>
            {/* Uncomment below to add a register link */}
            {/* <Typography
              component={Link}
              to="/register"
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Don&apos;t have an account?
            </Typography> */}
          </Stack>

          <SignInFormEmailCode />
        </Paper>
      </Grid>
    </Grid>
  );
}
