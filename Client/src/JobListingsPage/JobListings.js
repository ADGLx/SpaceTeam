import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';


export default function JobListings() {
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/813A9484-FD5C-4440-88E7EF9A3A31BD94/44A44EE2-9EE4-4B29-AA19F61A992900BB/WebsiteJpg_XL-FPACE_Main%20Visual_Cyan_Website.jpg"
          alt="green iguana"
          zIndex = 'tooltip'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Avionics Engineer (Aerospace)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Looking for some with 10+ years of experience in industry saifuiewuuweoigwe
           
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          C++ Expert
        </Button>
        <Button size="small" color="primary">
          MATLAB Expert
        </Button>
        
        
      </CardActions>
    
    </Card>
    
   
    
  );
}




