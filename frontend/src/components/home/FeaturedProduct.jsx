import * as React from "react"
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import ReactStars from "react-rating-stars-component";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Link } from 'react-router-dom';


const Product = () => {

    const {products} = useSelector(state => state.products);

    const description = (product) => {
        let desc = product.description
        if (desc.length > 26) {
            return (desc.substr(0, 26) + "...")
        }
        return desc
    }

    const productCard = (product,id) => {
        return (
        <Grid item xs={12} sm={3} md={2} m={1} key={id}>
            <Link to={{pathname: `/product/${product._id}`,state:1}}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    <CardActionArea>
                        <CardMedia
                            component="div"
                            sx={{
                                // 16:9
                                pt: '56.25%',
                            }}
                            image="https://source.unsplash.com/random"
                            alt="image"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h6" >
                                {product.productName}
                            </Typography>
                            <Typography variant='body2'>
                                {description(product)}
                            </Typography>

                            <ReactStars
                                count={5}
                                value={product.ratings}
                                size={24}
                                activeColor="#ffd700"
                                edit={false}
                                isHalf={true}
                            />


                            <Typography variant='subtitle1'>
                                <Box display={"flex"} alignItems="center">

                                    <CurrencyRupeeIcon fontSize="" />

                                    <span>{product.price}</span>
                                </Box>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    {/*<CardActions>
          <Button size="small">Add</Button>
          </CardActions>*/}
                </Card>
            </Link>
        </Grid >)
    }

return (
    
    <Container maxWidth="xl">
        <Grid container justifyContent={'center'} >

            {products && products.map((product, id) =>
                productCard(product,id)
            )}
        </Grid>
    </Container>
)
}


export default Product;