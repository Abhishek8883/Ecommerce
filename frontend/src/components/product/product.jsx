import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ProductCard from "../product/Productcard"


const product = () => {
    return (
        <>
            <Container maxWidth="xl">

                <Grid container justifyContent={'center'} >
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />

                </Grid>
            </Container>
        </>
    )
}


export default product