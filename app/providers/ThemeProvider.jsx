"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#365effd6",
      light: "#702dff",
      dark: "#2e1bbf",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#365dff",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#365dff",
            borderWidth: "1px",
          },
        },
      },
    },
    MuiPickersOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          "&:hover .MuiPickersOutlinedInput-notchedOutline": {
            borderColor: "#365dff",
          },
          "&.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
            borderColor: "#365dff",
            borderWidth: "1px",
          },
        },
      },
    },
  },
});
