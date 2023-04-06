import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import UploadFileIcon from '@mui/icons-material/UploadFile';



export default function EmployerA() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
       My Information

      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
          
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            sx={{ backgroundColor: '#fff', input: { color: '#000000' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          
            required
            id="lastName"
            sx={{ backgroundColor: '#fff', input: { color: '#000000' } }}
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Company"
            sx={{ backgroundColor: '#fff', input: { color: '#000000' } }}
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>


        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Email"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address"
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
        </Grid>
       
       




      </Grid>
    </React.Fragment>
  );
}

