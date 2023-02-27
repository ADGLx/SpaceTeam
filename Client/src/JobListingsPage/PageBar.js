import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from './SearchBar';
import SmallBar from './SmallBar';
import JobListings from './JobListings';
import { Grid, makeStyles } from '@mui/material';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';


function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function PageBar(props) {
  return (
    
    <React.Fragment>
        
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    JOB LISTINGS
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container>
      <Typography variant="h8" component="div" color= 'White'>
      <Box sx={{
          fontSize: '1.99rem',
          fontWeight: '700',
          position: 'absolute',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : '#fff'),
          top: 100,
          left: '31%',
          zIndex: 'mobile stepper',}}>   
          WELCOME TO THE JOB POSTINGS PAGE
        </Box>
            </Typography>
            </Container>
        {/* <Box sx={{
          p: 2,
          borderRadius: 2 ,
          fontSize: '0.875rem',
          fontWeight: '700',
          position: 'absolute',
          top: 175,
          left: '25%',
          zIndex: 'tooltip',}}>
          {<SearchBar variant="h8" component="div"/> }
        </Box>
        <Container> */}
        <Box sx={{
          p: 2,
          borderRadius: 2 ,
          fontSize: '0.875rem',
          fontWeight: '700',
          position: 'absolute',
          top: 175,
          left: '35%',
          zIndex: 'tooltip',}}>
        <div>
       <Grid container spacing={1}  >
            <Grid item xs = {6} sm = {6} lg={6}>
            <SearchBar/>
            </Grid>
            <Grid item xs = {6} sm = {6} lg={6}> 
            <SmallBar/>
            </Grid>
            </Grid>
            </div>
            </Box>
        {/* <Box sx={{
          p: 2,
          borderRadius: 2 ,
          fontSize: '0.875rem',
          fontWeight: '700',
          position: 'absolute',
          top: 175,
          left: '66%',
          zIndex: 'fab',}}>
          {<SmallBar variant="h8" component="div"/> }
        </Box> 
      </Container> */}
      {/* <Container>
       <Box sx={{
        p: 2,
        borderRadius: 2 ,
        fontSize: '0.875rem',
        fontWeight: '700',
        position: 'absolute',
        top: 275,
        left: '16%',
        zIndex: 'mobile stepper',}}>
        {<JobListings variant="h8" component="div"/> }
      </Box> 
      <Box sx={{
        p: 2,
        borderRadius: 2 ,
        fontSize: '0.875rem',
        fontWeight: '700',
        position: 'absolute',
        top: 275,
        left: '40%',
        zIndex: 'tmobile stepper',}}>
        {<JobListings variant="h8" component="div"/> }
      </Box> 
      <Box sx={{
        p: 2,
        borderRadius: 2 ,
        fontSize: '0.875rem',
        fontWeight: '700',
        position: 'absolute',
        top: 275,
        left: '64%',
        zIndex: 'tmobile stepper',}}>
        {<JobListings variant="h8" component="div"/> }
      </Box> 
      </Container> */}

<div>
    <Box sx = {{
         position: 'absolute',
         top: 275,
         left: '5%'
    }}>
     
        <Grid container spacing={3} >
            <Grid item xs = {12} sm = {6} lg={4}>
            <Card sx={{ minWidth: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/813A9484-FD5C-4440-88E7EF9A3A31BD94/44A44EE2-9EE4-4B29-AA19F61A992900BB/WebsiteJpg_XL-FPACE_Main%20Visual_Cyan_Website.jpg"
          alt="Aircraft"
          zIndex = 'tooltip'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Aerospace Engineer (Avionics)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Looking for some with 10+ years of experience in industry
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
        <Button size="small" color="primary">
          Full time
        </Button>
        
      </CardActions>
    
    </Card>
            </Grid>
            <Grid item xs = {12} sm = {6} lg={4} >
            <Card sx={{ minWidth: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://d92mrp7hetgfk.cloudfront.net/images/sites/H2B/software-engineers/original.jpg?1532640476"
          alt="Software Engineer"
          zIndex = 'tooltip'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Software Engineer (BackEnd Developer)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Looking for some with 10+ years of experience in industry 
           
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          JavaScript Expert
        </Button>
        <Button size="small" color="primary">
          Node/Express Expert
        </Button>
        <Button size="small" color="primary">
          Part time
        </Button>
        
      </CardActions>
    
    </Card>
            </Grid>
             <Grid item xs = {12} sm = {6} lg={4} >
             <Card sx={{ minWidth: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://www.globetoday.net/media/k2/items/cache/b9761710e2d567efefc41798919e031b_XL.jpg"
          alt="Chemist Handling Funnels"
          zIndex = 'tooltip'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Chemical Engineer (Specialist)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Looking for some with 10+ years of experience in industry 
           
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Organic Chemistry Expert
        </Button>
        <Button size="small" color="primary">
          Material Analysis
        </Button>
        <Button size="small" color="primary">
          Full time
        </Button>
        
        
      </CardActions>
    
    </Card>
            </Grid>
            <Grid item xs = {12} sm = {6} lg={4} >
            <Card sx={{ minWidth: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://th.bing.com/th/id/R.2eecc8144092c889d7203356d5b0144a?rik=l7I9E82eGKm1Yw&pid=ImgRaw&r=0"
          alt="Building Engineering Job"
          zIndex = 'tooltip'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Building Engineer
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Looking for some with 10+ years of experience in industry 
           
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
            </Grid>
            <Grid item xs = {12} sm = {6} lg={4} >
            <Card sx={{ minWidth: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://th.bing.com/th/id/R.e5dbf187c7b41e76484191b762034b8d?rik=8IUqPo77eHv5rA&riu=http%3a%2f%2fwonderfulengineering.com%2fwp-content%2fuploads%2f2013%2f06%2fMechanical-engineering-wallpaper-01.jpg&ehk=OKob8%2f1RVsV%2bSc55dF%2bbduqKSr7zfyKh7IK0JjOJxho%3d&risl=&pid=ImgRaw&r=0"
          alt="PipeLines"
          zIndex = 'tooltip'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Mechanical Engineer
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Looking for some with 10+ years of experience in industry 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          FLUIDS EXPERT
        </Button>
        <Button size="small" color="primary">
          CFD ANALYSIS EXPERT
        </Button>
        
        
      </CardActions>
    
    </Card>
            </Grid>
            <Grid item xs = {12} sm = {6} lg={4} >
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
            Looking for some with 10+ years of experience in industry 
           
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
            </Grid>
        </Grid>
        </Box>
   
    </div>
    </React.Fragment>
    
  );
}