import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Recent reports</Title>
      <Typography component="p" variant="h4">
        6
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