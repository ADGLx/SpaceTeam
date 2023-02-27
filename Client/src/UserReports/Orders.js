import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useState,useEffect } from 'react';
import Axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from '@mui/material';


// Generate Order Data
function createData(id, name, posting, type) {
  return { id, name, posting, type };
}

var rows;

function preventDefault(event) {
  event.preventDefault();
}

function DeleteButton (prop) {
  //In the button we need the info about 
  function handleDelete(id) 
  {
    
     // console.log("deleting reminder ID:"+ id)
      const jsonID = {
        PostID : id
      };


      Axios.post('/deletePost', jsonID).then (function (response) 
      {
        //In here we put message like 
        console.log("Reminder deleted!");
        window.location.reload(false);
      });
  }

  return (
    <React.Fragment>
      <Button onClick={(e) => handleDelete(prop.id)}><DeleteForeverIcon/></Button>
    </React.Fragment>
  );
}


export default function Orders() {
  
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    getAllUserReports();
  }, []);

  function getAllUserReports()
  {
        //Get the changes from the server
        Axios.get('/getUserReports').
        then(function (response) {
          //Create a quick new array
          var newData = []

           response.data.forEach(element => 
            {
            newData.push(createData(element['JobID'],element['CompanyName'],element['Position'],"Unasigned"))
           });

           setRows([...rows, ...newData])
        })
  }

  
  function removeRow(id)
  {
    delete rows[id];
    console.log("deleted "+ id)
  }
  
  
  return (
    <React.Fragment>
      <Title>Recent reports</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Company Name</TableCell>
            <TableCell>Posting</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Report Number</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.posting}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell align="right">{`${row.id}`}</TableCell>
              <TableCell align="right"><DeleteButton id= {row.id}/></TableCell>
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