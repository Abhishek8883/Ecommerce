import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import FeaturedProduct from "./FeaturedProduct";
import MetaData from '../layout/MetaData';
import { Alert, AlertTitle } from '@mui/material';
import { fetchProducts, setProducts, fetchProductsFail } from '../../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetProductsQuery } from '../../features/product/productApiSlice';
import { Link, useParams } from 'react-router-dom';
import Loader from '../layout/loader/Loader';


const Home = () => {


  const [getProducts] = useLazyGetProductsQuery();
  const { products, loading, error } = useSelector(state => state.products);
  const { keyword } = useParams();


  const dispatch = useDispatch();


  React.useEffect(() => {
    (async () => {
      dispatch(fetchProducts())
      const newData = await getProducts([keyword])
      if (newData && newData.data) {
        dispatch(setProducts(newData.data.data))
      }
      if (newData.error) {
        dispatch(fetchProductsFail(newData.error.error))
      }
    })()

  }, [dispatch, products])


  return (
    loading ? <Loader /> :
      (
        error ?
          <Container maxWidth="100%" sx={{ align: "center", mt: "5rem", height: "70vh" }}>
            <Alert severity="error">
            <AlertTitle >Error</AlertTitle>
            {error}</Alert>
          </Container>
          :
          (
            <>
              <MetaData title="ECOMMERCE" />
              <CssBaseline />

              <main>

                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    pt: 10,
                  }}
                >
                  <Container maxWidth="sm" >
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
                      sx={{ pt: 4, mb: "2rem" }}
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                    >
                      <Link to={"/products"}>
                      <Button variant="contained">Explore</Button>
                      </Link>
                      <Button variant="outlined">Become a seller</Button>
                    </Stack>
                  </Container>
                  <br />
                  {/* product component */}
                  <Typography variant="h6" align="center">Featured</Typography>
                  <br />
                  <Container maxWidth="xl" >
                    <FeaturedProduct products={products} />
                  </Container>

                </Box>

              </main>
            </>
          )
      )
  )
}


export default Home;
