import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}


const rows = [
    
  createData(
    0,
    '07 Feb, 2023',
    'Mary Birks ',
    'Scam',
    'Open',
    14,

  ),
  createData(
    1,
    '19 Feb, 2023',
    'Phillipe Smith',
    'Violating guidelines',
    'In Review',
    18,
  ),
  createData(2, '19 Feb, 2023', 'Alexander Fernandez', 'Spam', 'In Review', 22),
  
  createData(
    3,
    '20 Feb, 2023',
    'Michael Tomkins',
    'Violating guidelines',
    'Closed',
    28,
  ),
  createData(
    4,
    '25 Feb, 2023',
    'Ana Lee',
    'Scam',
    'Closed',
    13,
  ),
 
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent reports</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Report Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Report Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more user reports
      </Link>
    </React.Fragment>
  );
}