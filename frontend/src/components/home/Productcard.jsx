import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';


export default function MultiActionAreaCard() {
  return (
    <Grid item xs={12} sm={3} md={2} m={1} >
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardActionArea>
          <CardMedia
            component="div"
            sx={{
              // 16:9
              pt: '56.25%',
            }}
            image="https://source.unsplash.com/random?cars  "
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" >
              Product Name
            </Typography>
            <Typography variant='subtitle2'>
            {/*<Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />*/}
            </Typography>
            <Typography variant='subtitle1'>
              Price
            </Typography>
          </CardContent>
        </CardActionArea>
        {/*<CardActions>
          <Button size="small">Add</Button>
          </CardActions>*/}
      </Card>
    </Grid>
  );
}