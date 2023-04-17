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

import DeleteForeverIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {

  const [rows, setRows] = React.useState([]);

  //This just calls it everytime it is rendered
useEffect(() => {
  handleApplicantList();
 },[])

 async function handleApplicantList() {
  // Get user info from local storage
  const userInfo = JSON.parse(localStorage.getItem("user-token"));
  const currentUser = userInfo["ID"];
  const userRoleType = userInfo["type"];

  if (userRoleType === "admin") {
    // Fetch all applications if user is an admin
    try {
      const response = await Axios.get("/api/getAllApplications");
      const newData = response.data.map((element) => {
        return {
          id: element["AplicationID"],
          date: element["Date"],
          name: element["ApplicantName"],
          shipTo: element["Position"],
          paymentMethod: element["ApplicantEmail"],
          amount: (
            <a
              style={{ color: "rgb(255, 191, 0)" }}
              href={`data:image/png;base64,${element["CVBlob"]}`}
              download={`${element["ApplicantName"]}.png`}
            >
              {element["ApplicantName"]}'s CV
            </a>
          ),
        };
      });
      setRows(newData);
    } catch (error) {
      console.error(error);
    }
  } else {
    // Fetch only the current user's applications
    try {
      const response = await Axios.post("/api/displayJobs", {
        EmployerID: currentUser,
      });

      const newData = await Promise.all(response.data.map(async(element) => {
        const CVBlob = await handleGetCV(element.ApplicantEmail)
        return {
          id: element["AplicationID"],
          date: element["Date"],
          name: element["ApplicantName"],
          shipTo: element["Position"],
          paymentMethod: element["ApplicantEmail"],
          amount: (
            <a
              style={{ color: "rgb(255, 191, 0)" }}
              href={`data:image/png;base64,${CVBlob}`}
              download={`${element["ApplicantName"]}.png`}
            >
              {element["ApplicantName"]}'s CV
            </a>
          ),
        };
      }));
      setRows(newData);
    } catch (error) {
      console.error(error);
    }
  }
}

async function handleGetCV(username) {
  const sentObj = {
    name: username,
  };
  try {
    const response = await Axios.post("/api/getCV", sentObj);
    const CVbase64 = response.data;

    return CVbase64;

  } catch (error) {
    console.error(error);
    // handle error
  }
}

function handleDownloadComplete() {
  setDownloadUrl(null);
}

async function handleDeleteAplication(ID)
{
  console.log('Deleting aplication with id:', ID);
  try {
    await Axios.post("/api/deleteAplication", { ID: ID });
    setRows(rows.filter((row) => row.id !== ID));
  } catch (error) {
    console.error(error);
  }
}

  return (
    <React.Fragment>
      <Title>Applications</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Job Posting</TableCell>
            <TableCell>Email</TableCell>
            <TableCell >CV</TableCell>
            <TableCell >Reject</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
           
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell><Link   href = 'mailto:'>{row.paymentMethod}</Link></TableCell>
              <TableCell><Link href='#' color="primary">
                  {row.amount}
                  </Link>
                  </TableCell>
                  <TableCell ><IconButton onClick={() => handleDeleteAplication(row.id)}><DeleteForeverIcon /></IconButton></TableCell>
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