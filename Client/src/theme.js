import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    // This makes the default theme the dark one
    mode:'light',
    primary: {
      main: '#d5d540',
    },
    secondary: {
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
