import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';

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
    <ListItemButton >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    {/* <ListItemButton disabled>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="My Profile" />
    </ListItemButton>

    <ListItemButton >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Job Postings" />
    </ListItemButton> */}

  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Reports
    </ListSubheader>
    <ListItemButton disabled>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="All reports" />

    </ListItemButton> */}
    
  </React.Fragment>
);