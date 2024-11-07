import { createTheme } from '@mui/material/styles';

export const customColors = {
  lightGrey: '#dee2e6',
  
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#fbc02d',
    },
    secondary: {
      main: '#616161',
    },
  },
  typography: {
    fontFamily: 'Work Sans, Arial, sans-serif',
  },
});

export default theme;
