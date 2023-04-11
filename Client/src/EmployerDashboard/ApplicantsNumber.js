import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useEffect } from 'react';
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
      <Title>Recent Applicantions</Title>
      <Typography component="p" variant="h4" >
       {applicants}
      </Typography>
    </React.Fragment>
  );
}