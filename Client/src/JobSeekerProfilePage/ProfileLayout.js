import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { colors } from '@mui/material';
import Axios from "axios";

export default function ProfileLayout({isActiveStep}) {
    
  function handleEdit(event) 
    {
      event.preventDefault();
      var UserID= JSON.parse(localStorage.getItem('user-token'))["ID"];
      const data = new FormData(event.currentTarget);
 
      //console.log(UserID);
      const sentObj = {
        username: data.get('Name'),
        email: data.get('Email'),
        ID: UserID,
        CV: data.get('cv'),
        PF: data.get('pf')
      }
      console.log( data.get('pf'))


      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      

         Axios.post('/api/editAccount', sentObj).then((response)=>{
          var newToken = JSON.parse(localStorage.getItem('user-token'));
          newToken["username"] = data.get('Name');
          newToken["email"] = data.get('Email');
    
          localStorage.setItem('user-token',  JSON.stringify(newToken));
          window.location.replace("/JobSeekerProfilePage");
         }) 

      
      
    }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
       My Information
      </Typography>
      {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {JSON.parse(localStorage.getItem('user-token'))['username']}
            </Typography> */}
            <form onSubmit={handleEdit}> 
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Name"
            name="Name"
            label="Name/Company Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
           
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Email"
            name="Email"
            label="Email"
            fullWidth
            autoComplete="user-email"
            variant="standard"
          />
        </Grid>
    
          <Grid item xs = {12}>
                <Button
              variant="contained"
              component="label"
              type="submit"
            //   fullWidth
               sx={{ mt: 1, mb: 1,  width: '500px',  marginLeft: 'auto'}}
              >
               Upload Profile Photo <AccountCircle />
                <input
              type="file"
              name="pf"
                 hidden
                 />
               </Button>
               </Grid>

        <Grid item xs = {12}>
                <Button
              variant="contained"
              component="label"
            //   fullWidth
               sx={{ mt: 0.15, mb: 2,  width: '500px',  marginLeft: 'auto'}}
              >
               Upload File (JobSeeker Only)  <UploadFileIcon/>
                <input
              type="file"
              name="cv"
              hidden
                 />
               </Button>
               <Grid container justifyContent="flex-end">
                  <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                >
                  Sign Up
                </Button>
            </Grid>

               </Grid>
               
      </Grid>
      </form>
    </React.Fragment>
  );
}