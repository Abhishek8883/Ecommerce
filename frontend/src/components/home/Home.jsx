import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';

import {useGetProductsQuery} from "../../features/product/productApiSlice"
import Product from "../product/product";
import {ALL_PRODUCT_FAIL,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS} from "../../features/product/productSlice"

const defaultTheme = createTheme();




const Home = () => {

  const dispatch = useDispatch();
  
  const {isLoading,data,error} = useGetProductsQuery();
  
  // const fetchData = () => {
  //   dispatch(ALL_PRODUCT_REQUEST())
  //   if(data){
  //     dispatch(ALL_PRODUCT_SUCCESS(data))
  //   }
  //   else{
  //     dispatch(ALL_PRODUCT_FAIL(error))
  //   }
  // }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <main>
        
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 15,
            pb: 6,
          }}
        >
          <Container maxWidth="sm" mb={20}>
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

          {/* product component */}
          <Product />

        </Box>
      
      </main>

    </ThemeProvider>
  );
}


export default Home;
