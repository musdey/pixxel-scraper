"use client";
import { createTheme } from "@mui/material/styles";
import { Gothic_A1 } from "next/font/google";

import { colors } from "../components/colors";

const gothic = Gothic_A1({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

// Erstellen Sie ein benutzerdefiniertes Theme
const theme = createTheme({
  palette: {
    mode: "light", // Setzen Sie das Theme auf "light"
    primary: {
      main: colors.PRIMARY,
      light: colors.PRIMARY_LIGHT,
    },
    secondary: {
      main: colors.SECONDARY,
    },
    text: {
      primary: colors.TEXT,
    },
    grey: {
      200: colors.GREY_LIGHT,
      800: colors.GREY,
    },
    success: {
      main: colors.SUCCESS,
      light: colors.SUCCESS_LIGHT,
    },
    info: {
      main: colors.TEXT,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 20,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", //
          borderRadius: 0, // Mache die Ecken kantig
        },
      },
    },
  },
  typography: {
    fontFamily: gothic.style.fontFamily, // Verwenden Sie die Schriftart Gothic A1
  },
});

export default theme;
