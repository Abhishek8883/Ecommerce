import React from "react";
import { Box,Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Eshop
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const footer = () => {
  return (
    <Box sx={{ bgcolor: '#b6b8ba', p: 2, mt:"2rem" , position:"static" ,bottom:0 , width:"100%" }} component="footer" >
        {/* <Typography variant="h6" align="center" gutterBottom>
          Eshop
        </Typography> */}
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Your exclusive online shopping partner
        </Typography>
        <Copyright />
      </Box>
  )
}
export default footer;