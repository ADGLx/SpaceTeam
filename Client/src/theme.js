import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    // This makes the default theme the dark one
    mode:'light', 
    
    primary: {
      main: '#1565c0',
    },
    secondary: {
      main: '#f44336',
    },
    error: {
      main: '#f44336',
    },
    third: {
      main: '#808080',
    },
  },
});

export default theme;
