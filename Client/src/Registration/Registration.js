import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import myTheme from '../theme';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useColorMode } from '../themeutils';

const FormData = require('form-data');

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/Info">
        SPACE
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const theme = myTheme;

// function handleFile(e){
//   console.log(e.target.files, "$$$$");
//   console.log(e.target.files[0], "$$$$");
// }

export default function SignUp() {
  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const handleRegisterUser = (event) => 
  {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const fileUploaded = data.get('cv');
    console.log(fileUploaded.name);
    //new Response(data).text().then(console.log)

    const sentObj = {
      username: data.get('Name'),
      email: data.get('email'),
      password: data.get('password'),
      type: data.get('type'),
      CV: data.get('cv')
    }

   

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

      Axios.post('/api/register', sentObj, config)
      .then((response) => {
          //Handle here the login automatically once the server replies with true
          if(response.data)
          {
            //In here send the user to the login page back so they log in 
            navigate('/Sign-In');

          } else 
          {
            console.log("Something went wrong!");
          }
      })
  }
  const { mode, colorMode, theme } = useColorMode();


  return (
    <ThemeProvider theme={theme}>
       <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleRegisterUser}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label">
                  Account Type
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="type"
                    name="type"
                    value={age}
                    label="Account Type"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Job Seeker"}>Job Seeker</MenuItem>
                    <MenuItem value={"Employer"}>Employer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Personal or Company Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              component="label"
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              <br></br>
              <label>Upload CV (JobSeeker Only) </label>
              <input type="file" name="cv" style={{ display: "none" }} />
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="Sign-In" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}