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
        input: {
          color: "#525252",
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
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiFormHelperText-root": { mx: "1px" },
          "& .MuiInputBase-input": {
            fontSize: { sm: "14px", md: "15px" },
          },
          "& .MuiInputLabel-root": {
            fontSize: "14px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          textTransform: "capitalize",
          borderRadius: "6px",
        },
        contained: {
          "&:not(:disabled):hover": {
            // backgroundColor: "#2e50e6e7",
            boxShadow: "none",
          },
          boxShadow: "none",
        },
      },
    },
  },
});
