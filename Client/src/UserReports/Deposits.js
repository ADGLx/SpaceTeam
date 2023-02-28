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
  const [reports, setReports] = React.useState(0);
  //Query the server for all the reports 
  useEffect(() => {
    getAllUserReports();
  }, []);

  function getAllUserReports()
  {
        //Get the changes from the server
        Axios.get('/getUserReports').
        then(function (response) {
          //Create a quick new array
          console.log(response.data)
              setReports(response.data.length);
        })
  }


  return (
    <React.Fragment>
      <Title>Recent reports</Title>
      <Typography component="p" variant="h4">
        {reports}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 24 February, 2023
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View all reports
        </Link>
      </div>
    </React.Fragment>
  );
}