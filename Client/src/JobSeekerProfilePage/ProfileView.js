import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProfileLayout from './ProfileLayout';
import MessageLayout from './MessageLayout';
import ProfileViews from './ProfileView';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid, makeStyles } from '@mui/material';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import { useState,useEffect } from 'react';
import Axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';



const theme = createTheme({
    palette: {
      // This makes the default theme the dark one
      mode:'dark', 
      type: 'dark',
      primary: {
        main: '#d5d540',
      },
      secondary: {
        main: '#b5acad',
      },
      error: {
        main: '#f44336',
      },
    },
  });
  
  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
//   const steps = ['Update Profile'];
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <ProfileLayout />;
      case 1:
        return <MessageLayout />;
      case 2:
        <ProfileView/>;
      
    }
  }
  
  
  
  export default function ProfileView() {
    const [activeStep, setActiveStep] = React.useState(0);
  
    const handleNext = () => {
      setActiveStep(activeStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };
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
        Axios.post('/api/apply', sentObj).then (function (response) 
        {
          //In here we put message like 
          console.log("Job Applied");
        });
    }


    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const logout = () => {
      localStorage.clear();
      handleClose();
    };

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: 'relative',
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             Profile 
            </Typography>
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
                <MenuItem onClick={handleClose}><Link href="/JobSeekerProfileUpdate" variant="body2">
                    Update Profile
                  </Link></MenuItem>
                  <MenuItem onClick={handleClose}><Link href="/" variant="body2">
                    Main Page
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
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center" style={{ marginBottom: 16, textDecoration: 'underline' }}>
              My Profile
            </Typography>
            <Stack direction="row" spacing={2}>
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 56, height: 56 }}
        // align="center"
      />
    </Stack>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}  align="center">
         Name: {JSON.parse(localStorage.getItem('user-token'))['username']}
            </Typography>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}  align="center">
         Email: {JSON.parse(localStorage.getItem('user-token'))['email']}
            </Typography>

        
            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}  align="center">
         Job ID: {JSON.parse(localStorage.getItem('user-token'))['jobID']}
            </Typography> */}


           
            {/* {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Success!
                </Typography>
                <Typography variant="subtitle1">
                  Your Profile has been updated.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
  
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Save' : 'Save'}
                  </Button>
                </Box>
              </React.Fragment>
            )} */}
          </Paper>
          <Copyright />
        </Container>
      </ThemeProvider>
    );
  }

