import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';


export default function MultiActionAreaCard() {
  return (
    <Grid item xs ={12} sm={3} md={2}  bgcolor={'red'} m={1}>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column',}}
      >
        <CardMedia
          component="div"
          sx={{
              // 16:9
              pt: '56.25%',
          }}
          image="https://plus.unsplash.com/premium_photo-1666789257633-900f9dfc227d?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            Heading
          </Typography>
          <Typography>
            This is a media card. You can use this section to describe the
            content.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View</Button>
          <Button size="small">Edit</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}