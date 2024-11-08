import { createTheme } from '@mui/material/styles';

export const customColors = {
  lightGrey: '#dee2e6',
  semiGrey: '#9e9e9e',
  darkGrey: '#495057',
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
