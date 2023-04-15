import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';
import Axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '../themeutils';

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:3000/Info">
          SPACE
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  

  export default function ProfileView() {
    const [activeStep, setActiveStep] = React.useState(0);
    var User= JSON.parse(localStorage.getItem('user-token'))["username"];
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
    const [PFData, setPFData] = React.useState("");

  
    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    
    const redirect = () => {
      // console.log(localStorage.getItem("user-token"));
      if (JSON.parse(localStorage.getItem('user-token'))["type"] == "Employer") {
        window.location.replace("/EmployerDashboard");
      }

      else {
        window.location.replace("/");
      }

      handleClose();
    };

    //Having load the profile pic on load
     useEffect(() => {
      asyncGetPF();
      },[])

    async function asyncGetPF()
    {
      var temp = await handleGetPF(JSON.parse(localStorage.getItem("user-token"))['ID'])
      setPFData(temp) 
      //console.log(temp)
    }

    async function handleGetPF(id) {
      const sentObj = {
        id: id,
      };

        console.log("Attempting to get user:" + id + " profile pic")
        const response = await Axios.post("/api/getPF", sentObj);
        const PFbase64 = response.data;
    
          //console.log(PFbase64)
        return PFbase64;

    }

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
        <CssBaseline />
        <AppBar
        
          position="absolute"
          
          elevation={0}
          sx={{
            backgroundColor: 'primary',
            position: 'relative',
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Toolbar >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             Profile 
            </Typography>
            <IconButton sx={{ ml: 60 }} onClick={colorMode.toggleColorMode} color="inherit">
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
                <MenuItem onClick={handleClose}><Link href="/JobSeekerProfileUpdate" variant="body2">
                    Update Profile
                  </Link></MenuItem>
                  <MenuItem onClick={redirect}>
                    <Link variant="body2">
                    Main Page
                  </Link>
              </MenuItem>
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
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, borderWidth: 4, 
        borderStyle: 'solid' }}>
            <Typography component="h1" variant="h4" align="center" style={{ marginBottom: 16, textDecoration: 'underline' }}>
              My Profile
            </Typography>
            <Stack direction="row" spacing={2}  justifyContent="center">
      <Avatar
        alt={User}
        src={`data:image/png;base64,${PFData}`}
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

          </Paper>
          <Copyright />
        </Container>
      </ThemeProvider>
    );
  }

