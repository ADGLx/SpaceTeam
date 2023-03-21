import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function ProfileLayout() {
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
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
       My Information
      </Typography>
      {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {JSON.parse(localStorage.getItem('user-token'))['username']}
            </Typography> */}
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
        {/* <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Company"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid> */}
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
                 hidden
                 />
               </Button>
               </Grid>

        <Grid item xs = {12}>
                <Button
              variant="contained"
              component="label"
              type="submit"
            //   fullWidth
               sx={{ mt: 0.15, mb: 2,  width: '500px',  marginLeft: 'auto'}}
              >
               Upload File (JobSeeker Only)  <UploadFileIcon/>
                <input
              type="file"
                 hidden
                 />
               </Button>
               </Grid>
               
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this as my deafult job application package"
          />
        </Grid>

      </Grid>
    </React.Fragment>
  );
}