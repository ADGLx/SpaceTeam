import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import Axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from '@mui/material';

const columns = [
  { id: 'Position', label: 'Position', minWidth: 170 },
  { id: 'Description', label: 'Description', minWidth: 100},
  { id: 'NumberOfApplicants', label: 'Number of Applicants', minWidth: 170 },
  {id: 'JobID', label: 'Actions', minWidth: 50}
];

function createData(Position, Description, NumberOfApplicants, JobID) {
  
  return { Position, Description, NumberOfApplicants, JobID };
}



export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    handleJobPostings();
  },[])
  
  function handleJobPostings() {
    var userInfo = JSON.parse(localStorage.getItem("user-token"));
    // var username = userInfo["username"];
    var ID = userInfo["ID"];
    //console.log(username);

    const sentObj = {
      //CompanyName: username,
      UserID : ID
    };

    //Sent company name for query to backend:
    Axios.post("/api/JobPostings", sentObj).then(function (response) {

      var newData = []

      response.data.forEach(element => 
        {
          newData.push(createData(element['Position'], element['PositionInfo'], element['NumOfApplicants'], element['JobID']))

          console.log(element['JobID'])
        });

       setRows(newData);
    })
  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function DeleteButton (prop) {
    //In the button we need the info about 
    function handleDelete(id) 
    {
      
       // console.log("deleting reminder ID:"+ id)
        const jsonID = {
          PostID : id
        };
  
  
        Axios.post('/api/deletePost', jsonID).then (function (response) 
        {
          //In here we put message like 
          console.log("Post Deleted!");
          //window.location.reload(false);
          
          handleJobPostings();
        });

    }
  
function displayCell(param)
{
  // column.format && typeof value === 'number'
  //                           ? column.format(value)
  //                           : value
}

    return (
      <React.Fragment>
        <Button onClick={(e) => handleDelete(prop.id)}><DeleteForeverIcon/></Button>
      </React.Fragment>
    );
  }

  return (
    <Paper sx={{ width: '100%' , height: 800, overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : 
                            
                            column.id == 'JobID' ? 
                            <DeleteButton id= {value}/> : value
                            }

                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}