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
    '16 Feb, 2023',
    'Elvis Smith',
    'Systems Engineer',
    'Elvis112@gmail.com',
    1567,
  ),
  createData(
    1,
    '18 Feb, 2023',
    'Paul Merrel',
    'Avionics Engineer',
    'Paul8790@gmail.com',
    1544,
  ),
  createData(2, '18 Feb, 2023', 'Tom Burt', 'Stress Engineer', 'Tom_b@gmail.com', 1461),
  createData(
    3,
    '20 Feb, 2023',
    'Michael Harrison',
    'Technician',
    'Jackson45@hotmail.com',
    1456,
  ),
  createData(
    4,
    '23 Feb, 2023',
    'Bruce Jay',
    'Materials Engineer',
    'Bruce_85@yahoo.com',
    1546,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Applications</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Job number</TableCell>
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
        See more applications
      </Link>
    </React.Fragment>
  );
          }