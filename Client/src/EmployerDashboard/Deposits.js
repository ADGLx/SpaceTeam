import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [applicants, setApplicants] = React.useState(0);
  
  useEffect(() => {
    getNumberOfApplicants();
  }, []);

  function getNumberOfApplicants()
  {
    const userRole = JSON.parse(localStorage.getItem('user-token'))['type'];
    if (userRole === 'admin') {
      // Get all applications
      Axios.get('/api/getAllApplications')
        .then(function (response) {
          setApplicants(response.data.length);
        });
    } else {
    const EmployerID = JSON.parse(localStorage.getItem('user-token'))['ID']
        //Get the changes from the server
        const sentObj = {
          EmployerID: EmployerID
        }
        Axios.post('/api/displayJobs', sentObj).
        then(function (response) {
          //Create a quick new array
              setApplicants(response.data.length);
        });
  }
}

  return (
    <React.Fragment>
      <Title>Recent Applications</Title>
      <Typography component="p" variant="h4" >
       {applicants}
      </Typography>
      {/* <Typography color="text.secondary" sx={{ flex: 1 }}>
        as of 24 February, 2023
      </Typography> */}
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View all applicants
        </Link>
      </div> */}
    </React.Fragment>
  );
}