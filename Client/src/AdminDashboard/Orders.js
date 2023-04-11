import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useEffect } from 'react';
import Axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';

function createData(ID, username, password, type) {
  return { ID, username, password, type };
}




function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [rows, setRows] = React.useState([]);
  const [showAllUsers, setShowAllUsers] = React.useState(false);

  useEffect(() => {
    handleUserList();
  }, []);

  async function handleUserList() {
    try {
      const response = await Axios.get("/api/getAllUsers");
      const userData = response.data;
      
      const dataRows = userData
      .filter((user) => user.type !== 'admin')
      .map((user) => {
        return createData(
          user.ID,
          user.username,
          user.password,
          user.type
        )
      });
      setRows(dataRows);
    } catch (error) {
      console.error(error);
    }
  }
  async function handleDeleteUser(ID) {
    console.log('Deleting user with id:', ID);
    try {
      await Axios.post("/api/deleteUser", { ID: ID });
      setRows(rows.filter((row) => row.ID !== ID));
    } catch (error) {
      console.error(error);
    }
  }
  
  const rowsByType = rows.reduce((acc, row) => {
    if (!acc[row.type]) {
      acc[row.type] = [];
    }
    acc[row.type].push(row);
    return acc;
  }, {});

  return (
    <React.Fragment>
      <Title>User List</Title>
      {Object.keys(rowsByType).map((type) => (
        <div key={type}>
          <h2>{type}</h2>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {rowsByType[type]
                .slice(0, showAllUsers ? rowsByType[type].length : 5) // limit the number of rows to display
                .map((row) => (
                <TableRow key={row.ID}>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.password}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteUser(row.ID)}><DeleteForeverIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
      <Link color="primary" href="#" onClick={(event) => {
          event.preventDefault();
          setShowAllUsers(!showAllUsers); // toggle the state
        }}
        sx={{ mt: 3 }}
      >
        {showAllUsers ? "See less" : "See All Users"} {/* update the link text */}
      </Link>
    </React.Fragment>
  );
}