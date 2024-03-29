import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ProfileLayout from '../JobSeekerProfilePage/ProfileLayout';
import ProfileViews from '../JobSeekerProfilePage/ProfileView';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
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

const steps = ['Update Profile'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ProfileLayout />;
    case 1:
      <ProfileViews/>;
    
  }
}

export default function CheckoutLayout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        color="primary"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
           Update Profile
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
                <MenuItem onClick={handleClose}><Link href="/JobSeekerProfilePage" variant="body2">
                    Profile
                  </Link></MenuItem>
                  <MenuItem onClick={redirect}><Link variant="body2">
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
          <Typography component="h1" variant="h4" align="center" style={{ marginBottom: 30, textDecoration: 'underline' }}>
           Update Profile
          </Typography>
          {activeStep === steps.length ? (
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

              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}