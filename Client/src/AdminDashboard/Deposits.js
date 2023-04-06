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
    const EmployerID = JSON.parse(localStorage.getItem('user-token'))['ID']
        //Get the changes from the server
        const sentObj = {
          EmployerID: EmployerID
        }
        Axios.post('/api/displayJobs', sentObj).
        then(function (response) {
          //Create a quick new array
              setApplicants(response.data.length);
        })
  }

  return (
    <React.Fragment>
      <Title>Recent Postings</Title>
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
   {/* For admin to easily see how many job postings were created 
   recently 
   */}

    
<Title>Recent Profiles</Title>
      <Typography component="p" variant="h4" >
       {applicants}
      </Typography>
{/* For admin to easily see how many user profiles were created 
   recently 
   */}
    </React.Fragment>
  );




  
  
}