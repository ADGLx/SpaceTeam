import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    // This makes the default theme the dark one
    mode:'dark', 
    type: 'dark',
    primary: {
      main: '#d5d540',
    },
    secondary: {
      main: '#b5acad',
    },
    error: {
      main: '#f44336',
    },
  },
});

export default theme;
