import React from 'react';
import { createTheme } from '@mui/material/styles';

export const useColorMode = () => {
  const [mode, setMode] = React.useState(localStorage.getItem('mode') || 'light');
  
  React.useEffect(() => {
    localStorage.setItem('mode', mode);
  }, [mode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return { mode, colorMode, theme };
};
