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
import { useState,useEffect } from 'react';
import Axios from 'axios';
import WorkIcon from '@mui/icons-material/Work';
import ReportIcon from '@mui/icons-material/Report';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

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
  const [cards, setCards] = React.useState(0);
  const [cardsInfo, setCardsInfo] = React.useState([]);
  //Calls everytime page is rendered
  useEffect(() => {
    handleJobListings();
  },[cards])

  function handleJobListings()
  {
    Axios.get('/jobListings').
    then(function(response) {
      var newData = []
     // console.log(response.data);
      setCards(response.data.length);
      response.data.forEach(element => {
        newData.push(element);
      });
        setCardsInfo(newData);
  
  
    })
  }

  //Report Button
    //In the button we need the info about 
    function handleReport(JobID) 
    {
        const jsonID = {
          jobID : JobID
        };
        Axios.post('/report', jsonID).then (function (response) 
        {
          //In here we put message like 
          console.log("Job Reported");
        });
    }

      //Report Button
    //In the button we need the info about 
    function handleApply(EmployerID,JobID, Position, CompanyName) 
    {
      //Fixes ghetoness
      var UserID= JSON.parse(localStorage.getItem('user-token'))["ID"];
      var newJobID = EmployerID.jobID;
      var newEmployerID= EmployerID.EmployerID;
      var name= JSON.parse(localStorage.getItem('user-token'))["username"];
 
      var todaysDate = Date();

        const sentObj = {
          jobID : newJobID,
          userID: UserID,
          employerID: newEmployerID,
          position: Position,
          companyName: CompanyName,
          username: name,
          date: todaysDate
        };
        console.log(sentObj)

        Axios.post('/apply', sentObj).then (function (response) 
        {
          //In here we put message like 
          console.log("Job Applied");
        });
    }

  function ShowCards()
  {
   // console.log(cardsInfo)
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

      var returnValue = []
      for (let index = 0; index < cards; index++) {
        //In here we basically change the stuff 
       // console.log(cardsInfo[index])
        const jobID = cardsInfo[index]['JobID'];
        const CompanyName = cardsInfo[index]['CompanyName'];
        const Position = cardsInfo[index]['Position'];
        const PositionInfo = cardsInfo[index]['PositionInfo'];
        const EmployerID = cardsInfo[index]['EmployerID'];
       // console.log(jobID)


        var eachCard = ( <Grid item xs = {12} sm = {6} lg={4} >
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
         {Position}
        </Typography>
        <Typography variant="body2" color="text.secondary">

         {CompanyName}
        </Typography>
        </CardContent>
        </CardActionArea>
       
        <CardActions disableSpacing>
        <Button size="medium" color="primary" name={jobID} onClick={() => handleApply({EmployerID,jobID, Position, CompanyName})}>
        Apply
        </Button>
              <IconButton aria-label="report" sx={{color: "#FC0"}} name={jobID} onClick={() => handleReport({jobID})}>
                 <ReportIcon /> 
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
                <Typography paragraph>Details:</Typography>
                <Typography paragraph>
                <Button size="small" color="primary">
        PLACEHOLDER_INFO
        </Button>
        <Button size="small" color="primary">
        PLACEHOLDER_INFO
        </Button>
                </Typography>
                <Typography paragraph>
                {PositionInfo}
                </Typography>
                {/* <Typography paragraph>
              
                </Typography>
                <Typography>
                  
                </Typography> */}
              </CardContent>
            </Collapse>
        </Card>
         </Grid>
        )


        
        returnValue.push(eachCard)
      }

      return returnValue;
  }
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
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container>
      <Typography variant="h8" component="div" color= 'White'>
      <Grid container spacing={1}  >
            <Grid item xs = {12} sm = {12} lg={12}>
      <Box sx={{
          fontSize: '1.88rem',
          fontWeight: '700',
          position: 'absolute',
          top: 105,
          left: '32%',
          zIndex: 'mobile stepper',}}>   
          WELCOME TO THE JOB POSTINGS PAGE
        </Box>
        </Grid>
        </Grid>
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
     
        <Grid container spacing={3}>
          <ShowCards />
        </Grid>
        </Box>
   
    </div>
    </React.Fragment>
    
  );
}