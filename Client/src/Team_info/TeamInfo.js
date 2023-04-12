import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material/styles';
import myTheme from "../theme";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
//So this would be sort of like the landing page 

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/Info">
        SPACE
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(name, ID, Github, Role ) {
    return { name,  ID, Github,  Role };
  }
  
  const rows = [
    createData('Alvaro David Gonzalez Lopez (Leader)', 40153040, 	'github.com/ADGLx', 'Backend, Server Manager'),
    createData('Muhammad Usman', 40176930, 'github.com/MuhammadUsman20002'	, 'Frontend'),
    createData('Tharushi Rathnayaka', 40126072, 'github.com/TharushiRathnayaka', 'Frontend'),
    createData('Saravan Thungavelu', 40151539, 'github.com/Saravan00', 'Frontend'),
    createData('Krupesh Patel', 40175794,	'github.com/Krupesh2001', 'Backend'),
    createData('Dimitri Karagiannakis', 40097824, 	'github.com/DimitriKaragiannakis99', 'Backend,Database Manager'),
  ];
  

//This is what chooses the theme
const theme = myTheme;

export default function Album() {
  return (
    <ThemeProvider theme={theme}>
      {/* This is the routing going on */}
   

      <CssBaseline />
     
      <AppBar position="relative">
        <Toolbar>
          
          <Typography variant="h6" color="inherit" noWrap>
            SPACE
          </Typography>
          <AirlineStopsIcon/>
        </Toolbar>
      </AppBar>
      <main>
      
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="undefined">
            <Typography
              component="h6"
              variant="h6"
              align="left"
              color="text.primary"
              gutterBottom
            >
              Objective
            </Typography>
            <Typography variant="h8" align="left" color="text.secondary" paragraph>
            The scope of this project is to establish a simplified version of a job application website which will allow the users to browse and apply for various avaliable job vacancies.In addition to that, the users shall be able to receive interview requests, receive acceptance or rejection decisions from the employee and the possibility to edit the job advertisement in real time. These objectives can only be acquired with the assistance of certain technologies that will be utilized to establish the website.
            </Typography>
            <Typography
              component="h6"
              variant="h6"
              align="left"
              color="text.primary"
              gutterBottom
            >
              Project Description
            </Typography>
            <Typography variant="h8" align="left" color="text.secondary" paragraph>
            The search for a job can be a daunting task for a student looking for an internship or perhaps even a full-time job after graduating. To ease this process, we have developed a web application that allows the students to look for a particular job based on their needs. They can either use their profiles to find jobs that match their needs or manually sort through jobs based on specific criteria such as the type of job, the salary, and the proximity to their homes. The student, after finding a suitable job, can then submit their documents, such as their CV and resume, to the employer. The employers can manually accept or reject any application. Once the employer is satisfied with a particular application, they can directly schedule an interview with the applicant. To make the job recruiting process easier, the employer can also create and modify job postings freely.

Finally, to ensure a safe and friendly user experience, there will be moderators that can be flagged when an issue has occurred. The moderators can temporarily remove things like false applications or job postings and gain access to the accounts associated with the misconduct. After reviewing them, the moderator can send a request to the admin to take appropriate action. The admin can remove any false postings and ban any user that breaks the application guidelines. This ensures that both students and employers can have a safe and easy-to-use platform.
            </Typography>
            <Typography
              component="h6"
              variant="h6"
              align="left"
              color="text.primary"
              gutterBottom
            >
              Core features
            </Typography>
            <Typography variant="h8" align="left" color="text.secondary" paragraph>
-Applying for jobs
</Typography>
<Typography variant="h8" align="left" color="text.secondary" paragraph>
-Browsing job applicants
</Typography>
<Typography variant="h8" align="left" color="text.secondary" paragraph>
-Selecting candidates for interviews
            </Typography>
            <Typography
              component="h6"
              variant="h6"
              align="left"
              color="text.primary"
              gutterBottom
            >
              Team Members
            </Typography>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Team Member</StyledTableCell>
            <StyledTableCell align="left">Student ID</StyledTableCell>
            <StyledTableCell align="left">GitHub</StyledTableCell>
            <StyledTableCell align="left">Role</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">{row.ID}</StyledTableCell>
              <StyledTableCell align="left">{row.Github}</StyledTableCell>
              <StyledTableCell align="left">{row.Role}</StyledTableCell>
            
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Typography
              component="h6"
              variant="h6"
              align="left"
              color="text.primary"
              gutterBottom
            >
              Technologies
            </Typography>
            <Typography variant="h8" align="left" color="text.secondary" paragraph>
-React
</Typography>
<Typography variant="h8" align="left" color="text.secondary" paragraph>
-Node JS
</Typography>
<Typography variant="h8" align="left" color="text.secondary" paragraph>
-SQL
            </Typography>

          </Container>
        </Box>
  
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">

        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
