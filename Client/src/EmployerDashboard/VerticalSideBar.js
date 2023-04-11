import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import { Link } from "react-router-dom";

export const AdminListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/AdminDashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    
    <ListItemButton component={Link} to="/JobPostings">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="All Job Postings" />
    </ListItemButton>
    <ListItemButton component={Link} to="/EmployerDashboard">
   <ListItemIcon>
  <LayersIcon />
  </ListItemIcon>
  <ListItemText primary="All Applications" />
  </ListItemButton>
  <ListItemButton component={Link} to="/UserReports">
   <ListItemIcon>
  <LayersIcon />
  </ListItemIcon>
  <ListItemText primary="All Reports" />
  </ListItemButton>
  </React.Fragment>
);

export const mainListItems = (
  
  <React.Fragment>
    <ListItemButton component={Link} to="/EmployerDashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/JobSeekerProfilePage">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText  primary="My Profile" />
    </ListItemButton>

    <ListItemButton component={Link} to="/JobPostings">
   <ListItemIcon>
  <LayersIcon />
  </ListItemIcon>
  <ListItemText primary="Job Postings" />
  </ListItemButton>
  


</React.Fragment>

);

export const secondaryListItems = (
  <React.Fragment>
   
    
   
      
   
    
  </React.Fragment>
);