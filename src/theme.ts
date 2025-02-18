"use client";

import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        className: "!capitalize",
      },
      styleOverrides: {
        root: {
          paddingLeft: 22,
          paddingRight: 22,
          paddingTop: 7,
          paddingBottom: 7,
          borderRadius: 9999,
        },
        containedPrimary: {
          color: "#f2f2f2",
          background:
            "linear-gradient(90deg, rgba(160,90,255,1) 0%, rgba(107,26,218,1) 100%);",
        },
        containedSuccess: {
          color: "#f2f2f2",
        },
      },
    },
  },
  typography: {
    allVariants: {
      fontFamily: roboto.style.fontFamily,
    },
  },
  palette: {
    primary: {
      main: "#A05AFF",
    },
    success: {
      main: "#1BCFB4",
    },
  },
});
