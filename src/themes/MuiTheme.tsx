import React, { ReactNode } from "react";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";

const MuiTheme = ({ children }: { children: ReactNode }) => {
  let theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: "linear-gradient(to right, #fafafa, #edf5ff )",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          },
        },
      },
    },
    typography: {
      fontFamily: "'Nunito', sans-serif",
      body1: {
        fontSize: "18px",
      },
      button: {
        textTransform: "none",
      },
    },
    palette: {
      primary: {
        main: "#353849",
      },
      text: {
        primary: "#353849",
      },
    },
  });
  theme = responsiveFontSizes(theme);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiTheme;
