import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import Album from './Album';
import Candidate_info from './Candidate_info';
import theme from './theme';
import SignInSide from './Sign-In/SignInSide';
//Implementing the routing
import {BrowserRouter} from "react-router-dom";
import { Routes, Route, Outlet } from "react-router-dom";

import ProtectedRoute from './util/ProtectedRoute';
<<<<<<< Updated upstream
=======
import PageBar from './JobListingsPage/PageBar';
import JobPosting from './JobPostings/JobPostings';
>>>>>>> Stashed changes


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);



//I will build in here the logic to switch pages but then pass it to another page or sum

const Routing = () => {
  return(
    <Routes>
      {/* Handle login here */}
        <Route path="/profile" element={
          <ProtectedRoute> 
           {/*  <Album/> */}
        </ProtectedRoute>
        } />
    
        <Route path="Sign-In" element={<SignInSide />} />
<<<<<<< Updated upstream
        <Route path="/" element={<Album/>} />
        <Route path="candidate-info" element={<Candidate_info/>} />
=======
        <Route path="Sign-Up" element={<Registration />} />
        <Route path="EmployerDashboard" element={<EmployerDashboard />} />
        <Route path="UserReports" element={<UserReports />} />
        <Route path="JobPostings" element={<JobPosting />} />
        {/* <Route path="/" element={<Album/>} />
        <Route path="JobListingsPage" element={<PageBar />} /> */}
        
>>>>>>> Stashed changes
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
  )
}

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    {/* <CssBaseline /> */}
    {/* <Album /> */}
   
    <BrowserRouter> 
    {/* Using <Album /> as main page, should later become my CV*/}
  
      <Routing />
    
    </BrowserRouter>
    
  </ThemeProvider>,
);
