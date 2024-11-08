import { createTheme } from '@mui/material/styles';

export const customColors = {
  lightGrey: '#dee2e6',
  semiGrey: '#9e9e9e',
  darkGrey: '#495057',
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
  },
  typography: {
    fontFamily: 'Work Sans, Arial, sans-serif',
  },
});

export default theme;
