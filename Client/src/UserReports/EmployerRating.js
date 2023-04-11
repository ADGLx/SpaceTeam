import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Title from './Title';
import Rating from '@mui/material/Rating';

function createData(Employer, N_P, Rating) {
  return { Employer, N_P, Rating };
}

const rows = [
  createData('Google', 159 ),
  createData('ACER', 237),
  createData('Michael Scott Paper Company', 262),
  
];

export default function DenseTable() {
    
  return (
    
    <TableContainer component={Paper}>
         <Title>Employer Rating</Title>
      <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
        <TableHead>
        
          <TableRow>
            <TableCell>Employer</TableCell>
            <TableCell align="left">Number of Postings</TableCell>
            <TableCell align="left">Rating</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Employer}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Employer}
              </TableCell>
              <TableCell align="left">{row.N_P}</TableCell>
              <TableCell align="left"><Rating name="size-small" defaultValue={5} size="small" /></TableCell>
           
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  );
}