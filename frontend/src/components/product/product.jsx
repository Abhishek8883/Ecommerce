import * as React from "react"
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ProductCard from "../product/Productcard";
import { useSelector } from 'react-redux';


const Product = () => {

    const {loading,products} = useSelector(state => state.product) 

    return (
        loading?<h1>Loading...</h1>:
        <>
            <Container maxWidth="xl">

                <Grid container justifyContent={'center'} >
                    
                {products.map((product,id) => 
                    <ProductCard key={id} product={product} />
                )}
                </Grid>
            </Container>
        </>
    )
}


export default Product;