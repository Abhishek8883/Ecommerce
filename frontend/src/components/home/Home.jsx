import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Productcard from "./Productcard"

const defaultTheme = createTheme();



const Home = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <main>
        
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Welcome to Eshop
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
             Find all the things you need , Here only .
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Explore</Button>
              <Button variant="outlined">Become a seller</Button>
            </Stack>
          </Container>
        </Box>


        <Container maxWidth="xl">
          
          <Grid  container justifyContent={'center'} >
            <Productcard /> 
            <Productcard /> 
            <Productcard /> 
            <Productcard /> 
            <Productcard /> 

          </Grid>
        </Container>
      </main>

    </ThemeProvider>
  );
}


export default Home;
