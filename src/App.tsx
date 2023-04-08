import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Countries from "./pages/Countries";
import Universities from "./pages/Universities";
import { createTheme, ThemeProvider } from "@mui/material";
import { blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
  },
  components: {
    MuiBreadcrumbs: {
      styleOverrides: {
        li: {
          a: {
            padding: 20,
            cursor: "pointer",
          },
          div: {
            padding: 20,
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: 20,
          marginBottom: 20,
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          margin: 20,
          display: "flex",
          justifyContent: "center",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "5px",
          border: "1px solid rgba(0,0,0,0.1)",
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          fontWeight: "bolder",
          "&:hover": {
            color: blue[900],
          },
        },
      },
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Countries />} />
            <Route path="/universities" element={<Universities />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
