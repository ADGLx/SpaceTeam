import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Grid} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import { useState,useEffect } from 'react';
import Axios from 'axios';
import ReportIcon from '@mui/icons-material/Report';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Link from '@mui/material/Link';
import Search from './SearchBar';
import Rating from '@mui/material/Rating';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import {ThemeProvider} from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '../themeutils';

// const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})
(({ theme, expand }) => ({
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
  const [PFData, setPFData] = React.useState([]);
  //Calls everytime page is rendered
  useEffect(() => {
    handleJobListings();
  },[cards])

  function handleJobListings()
  {
    Axios.get('/api/jobListings').
    then(async function(response) {
      var newData = []
     // console.log(response.data);
      setCards(response.data.length);




      response.data.forEach(element => {
       //element.img= handleGetPF(element.EmployerID);
        newData.push(element);
        //console.log(element)
        //ArrayWithPF.push(handleGetPF(element.id))
      });
      // for(const element of newData)
      // { 
      //   // element.img= await handleGetPF(element.EmployerID);
      //    //newData.push(element);
      //    console.log(element)

      // }

      getAllImages();

        setCardsInfo(newData);
  
  
    })
  }
  const [searchTerm, setSearchTerm]= useState('');
  const handleSearch =(term)=>{
    setSearchTerm(term);
  }


async function getAllImages()
{
  const AllImages ={};
  let AllIDs = [];
  for (const element of cardsInfo) 
  {
    AllIDs.push(element.EmployerID);
  }

  //This removes all duplicates
  AllIDs = [...new Set(AllIDs)];

  //Now we call and store all the images that are needed 
  for (let index = 0; index < AllIDs.length; index++) 
  {
    const id = AllIDs[index];

      const image = await handleGetPF(id);
  
    AllImages[id]= image;
  }
//Im done here
 setPFData(AllImages)
}

  async function handleGetPF(id) {
    const sentObj = {
      id: id,
    };

      //console.log("Attempting to get user:" + id + " profile pic")
      const response = await Axios.post("/api/getPF", sentObj);
      const PFbase64 = response.data;
  
        //console.log(PFbase64)
      return PFbase64;

  }


  //api/report Button
    //In the button we need the info about 
    function handleReport(JobID) 
    {
        const jsonID = {
          jobID : JobID
        };
        Axios.post('/api/report', jsonID).then (function (response) 
        {
          //In here we put message like 
          console.log("Job Reported");
        });
    }

      //api/report Button
    //In the button we need the info about 
    function handleApply(data) 
    {
      //Fixes ghetoness
      var UserID= JSON.parse(localStorage.getItem('user-token'))["ID"];
      var newJobID = data.jobID;
      var newEmployerID= data.EmployerID;
      var newPosition = data.Position;
      var newCompanyName = data.Position;
      var name= JSON.parse(localStorage.getItem('user-token'))["username"];
      var Email= JSON.parse(localStorage.getItem('user-token'))["email"];
 
      //console.log(EmployerID)
      var todaysDate = new Date().toLocaleDateString();

        const sentObj = {
          jobID : newJobID,
          userID: UserID,
          employerID: newEmployerID,
          position: newPosition,
          companyName: newCompanyName,
          username: name,
          date: todaysDate,
          email: Email
        };
       // console.log(sentObj)

        Axios.post('/api/apply', sentObj).then (function (response) 
        {
          //In here we put message like 
          console.log("Job Applied");
        });
    }

    //TODO: Fix this, it is updating 3 times for some weird reason
  function ShowCards()
  {
    console.log(PFData)
    const [expanded, setExpanded] = useState(Array(cards).fill(false));

     
    const handleExpandClick = (index) => {
      setExpanded((prevState) => {
        const nextState = [...prevState];
        nextState[index] = !nextState[index];
        return nextState;
      });
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
        if (searchTerm && searchTerm.trim() !== '' && !Position.toLowerCase().includes(searchTerm.toLowerCase()) && !CompanyName.toLowerCase().includes(searchTerm.toLowerCase())){
          continue;
        }else if (!searchTerm || searchTerm.trim()=== ''){

        }else{
          
        }
        //console.log(Position)
        const ImgData = PFData[EmployerID];
        
        var eachCard = ( 
        <Grid  item xs = {12} sm = {6} lg={4} >
          <Card sx={{ minWidth: 200, margin: '1rem'}}>
        <CardActionArea>
        <CardMedia
        component="img"
        height="200"
         image={`data:image/png;base64,${ImgData}`}
        alt='Employer Has Not Selected A Profile Picture'
        zIndex = 'tooltip'
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {Position}
        </Typography>
        <Typography variant="body2" color="text.secondary">

         {CompanyName}
         <Rating position='centre' name="size-small" defaultValue={4} size="small" readOnly  />
        </Typography>
        </CardContent>
        </CardActionArea>
       
        <CardActions disableSpacing>
        <Button variant="contained" size="medium" color="primary" name={jobID} onClick={() => handleApply({EmployerID,jobID,Position,CompanyName})}>
        Apply
        </Button>
              <IconButton aria-label="report" sx={{color: "primary"}} name={jobID} onClick={() => handleReport({jobID})}>
                 <ReportIcon color= "secondary"/> 
              </IconButton>
              <ExpandMore
              
              expand={expanded[index]}
              onClick={() => handleExpandClick(index)}
              aria-expanded={expanded[index]}
              aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
        </CardActions>
        <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
        <CardContent >
                <Typography paragraph>Details:</Typography>
                <Typography paragraph>
    
        <Button size="small" color="primary">
        PLACEHOLDER_INFO
        </Button>
                </Typography>
                <Typography paragraph>
                {PositionInfo}
                </Typography>
                
              </CardContent>
            </Collapse>
        </Card>
          </Grid>
        )

        returnValue.push(eachCard)
      }

      return returnValue;
  }
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };


  
  //For theme
  const { mode, colorMode, theme } = useColorMode(); 
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear();
    localStorage.setItem('mode', mode);
    handleClose();
  };
  
  return (
    <ThemeProvider theme={theme}>
    <React.Fragment>
        
      
      <CssBaseline />
      
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Welcome {JSON.parse(localStorage.getItem('user-token'))['username']}!
            </Typography>
            
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
          
       {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><Link href="/JobSeekerProfilePage" variant="body2">
                    Profile
                  </Link></MenuItem>
                <MenuItem onClick={logout}>
                <Link href="/Sign-In" variant="body2">
                    Logout
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          )}
          
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      
      <Toolbar />
      <Container >
      <Typography variant="h8" component="div" color= 'light'>
            </Typography>
            </Container>
            <Grid
            
            container
  spacing={10}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: '35vh' }}
>

  <Grid item xs={6} style={{ fontSize: '44px' }}  >
   Job Postings <AirlineStopsIcon fontSize="large"/>
   <Search color='#000000' onSearch={handleSearch}/>
  </Grid>   
  
</Grid>
        
     <Grid
  container
  spacing={1.5}
  direction="row"
  style={{ minHeight: '12vh' }}
>
          <ShowCards/>
       
</Grid>
    </React.Fragment>
    </ThemeProvider>
  );
}