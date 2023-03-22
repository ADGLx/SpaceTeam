import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import mytheme from '../theme';

//The stuff to call the login API
import { useEffect, useState, useContext } from 'react';
import Axios from "axios";

//Call the Auth,
//import AuthContext from "../AuthProvider";

//This is a sample function of how to use the API
function ShowAPIData(){

  const [backendData, setBackendData] = useState([{}])

  useEffect(() =>{
    fetch("/api").then (response => response.json()).then(data=> setBackendData(data))
  }, []) //this is so it can only be called the first time it oppens the page


  return(
    <div>
      {(typeof backendData.users==='undefined') ? (
        <p> Loading...</p>
      ):(
        backendData.users.map((user,i)=> (
          <p key ={i}>{user}</p>
        ))
      )}
    </div>
  )
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const theme = createTheme();
const theme = mytheme; //Using my custom theme 

export default function SignInSide() {

  // const {setAuth} = useContext(AuthContext);
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState(false)
  //There is some sort of error but wtv

  //This sends the submit
  const handleSubmit = (event) => {
    event.preventDefault(); //so it is not called as soon as it starts I think
    const data = new FormData(event.currentTarget);
    // console.log('user:', data.get('username'));
    // console.log('pass:', data.get('password'));
    
    const sentObj = {username: data.get('username'),
    password: data.get('password')};


    //For some reason this dont work so ill try the old way of just calling the sv
    Axios.post('/api/login', sentObj)
    .then((response)=> {
      //console.log(response.data)
      //set user state here if
      if(response.data == true)
      {
        setErrorMsg(true)
        console.log("Unable to login, response;  "+ response.data)
      }
      else //In here the login takes place btw
      {
        setErrorMsg(false)
        localStorage.clear();
        //Save token CHANGE LATER THIS IS HELLA UNSAFE
        var token = response.data
        //console.log("Saving token as: "+ JSON.stringify(token) )
        localStorage.setItem('user-token', JSON.stringify(token)) //This is so the user is remembered later or sum

        console.log(token['type']);
          //So in here we handle the user type
          if(token['type']=="Employer")
          {
            navigate('/EmployerDashboard');
          } else if(token['type']=="Moderator")
          {
            navigate('/UserReports');
          } 
          //Just a job seeker
          else {
            navigate('/');
          }
       // navigate('/');

      }


    })
    .catch ((err)=> {
      console.log(err);
    })

    //Hereis the other way of calling the sv (nvm it doesnt work because it is like some sort of trigger)
    // const [username, setUsername] = useState([{}])
    // useEffect(() =>{
    //   fetch("/api/login").then (response => response.json()).then(newdata=> setUsername(newdata))
    // }, []) //this is so it can only be called the first time it oppens the page
  
    //Doing it n here again to see if
  };

  //This might handle the reply
  function ShowTextFields () {
    
    if(errorMsg)
    {
      return<span> <TextField
      error
      margin="normal"
      required
      fullWidth
      id="username"
      label="Email"
      name="username"
      autoFocus
       helperText= {"Wrong email/password"}
    />
    <TextField
    error
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
    /> </span>
    } else 
    {
      return<span> <TextField
      margin="normal"
      required
      fullWidth
      id="username"
      label="Email"
      name="username"
      autoFocus
      // helperText= {}
    />
    <TextField
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
    /> </span>
  
    }

   

  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://cdn.discordapp.com/attachments/1067497158439354408/1087911144510988348/received_755283892625460.jpg)',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: '100%',
            backgroundPosition: 'right',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <ShowTextFields />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" checked={true} disabled/>}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/Sign-Up" variant="body2">
                    Dont have an account? Register here
                  </Link>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
              {/* <ShowAPIData /> */}
              <Copyright sx={{ mt: 5 }} />

              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
