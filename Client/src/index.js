import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import Album from './Album';
import theme from './theme';
import EmployerDashboard from './EmployerDashboard/EmployerDashboard';
import UserReports from './UserReports/UserReports';
import SignInSide from './Sign-In/SignInSide';
import Registration from './Registration/Registration';
//Implementing the routing
import {BrowserRouter} from "react-router-dom";
import { Routes, Route, Outlet } from "react-router-dom";

import ProtectedRoute from './util/ProtectedRoute';


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
        <Route path="Sign-Up" element={<Registration />} />
        <Route path="EmployerDashboard" element={<EmployerDashboard />} />
        <Route path="UserReports" element={<UserReports />} />
        <Route path="/" element={<Album/>} />
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
