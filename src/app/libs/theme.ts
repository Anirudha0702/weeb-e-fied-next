"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {

      primary: {
        main: '#bb00ff', // Red
        light:'#e9a6ff',
        dark:'#c63eff',
        contrastText: '#ffffff', // Black
      },
      secondary: {
        main: '#121212', 
        light:'#333333',
        dark:'#000000',
        contrastText: '#FFFFFF', // White
      },
      background: {
        default: '#020617', // Dark Background
        paper: 'rgba(255,255,255,0.05)', // Darker Gray
      },
      text: {
        primary: '#FFFFFF', 
        secondary: '#000000',
        disabled: '#717171',
      },
    },
    typography: {
      fontFamily: '"Roboto", sans-serif',
    },
    breakpoints: {
      values: {
        xs: 0,      // Tailwind xs
        sm: 600,    // Tailwind sm
        md: 900,    // Tailwind md
        lg: 1200,   // Tailwind lg
        xl: 1536,   // Tailwind xl
      },
    },
  });
  

export default theme;
