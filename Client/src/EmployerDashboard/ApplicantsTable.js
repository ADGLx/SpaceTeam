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
  // Hard code to test job applications on employer dashboard
  var userInfo = JSON.parse(localStorage.getItem("user-token"));
  var currentUser = userInfo["ID"];

  const sentObj = {
    EmployerID: currentUser,
  };

  try {
    const response = await Axios.post("/api/displayJobs", sentObj);
    // Iterate through each job application
    for (const element of response.data) {

      // Get the CV blob for the applicant in JSON
      const cvBase64URL = await handleGetCV(currentUser);
      console.log(cvBase64URL)

      // Create a new data object for the applicant with the downloadable link
      const newData = createData(
        element[""],
        element["Date"],
        element["ApplicantName"],
        element["Position"],
        element["ApplicantEmail"],
        <a style ={{ color:"rgb(255, 191, 0)"}}href={`data:image/png;base64,${cvBase64URL}`} download={`${element["ApplicantName"]}.png`}>{element["ApplicantName"]}'s CV</a>
      );

      setRows((rows) => [...rows, newData]);
    }
  } catch (error) {
    console.error(error);
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
            <TableCell align="center">CV</TableCell>
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
                {/* {downloadUrl && (
                  <Link color= "primary" href={downloadUrl} download="CV.png" onClick={handleDownloadComplete}>Download CV</Link>
                )}
                  {!downloadUrl && (
                    <button onClick={handleDownloadClick}>Download CV</button>
                  )} */} 
                  {row.amount}
                  </Link>
                  </TableCell>
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