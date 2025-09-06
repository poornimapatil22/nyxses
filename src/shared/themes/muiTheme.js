// // muiTheme.js
// import { createTheme } from "@mui/material/styles";
// import { theme as customTheme } from "./theme";

// export const muiTheme = createTheme({
//   palette: {
//     primary: { main: customTheme.colors.primary },
//     secondary: { main: customTheme.colors.secondary },
//     error: { main: customTheme.colors.error },
//     info: { main: customTheme.colors.info },
//     success: { main: customTheme.colors.success },
//     warning: { main: customTheme.colors.warning },
//     background: {
//       default: customTheme.colors.background,
//       paper: customTheme.colors.white,
//       background_Dark: customTheme.colors.background_Dark,
//     },
//     text: {
//       primary: customTheme.colors.black,
//       secondary: customTheme.colors.white,
//     },
//     purple: {
//       purple: customTheme.colors.purple.purple,
//       lighten_1: customTheme.colors.purple.lighten_1,
//       lighten_2: customTheme.colors.purple.lighten_2,
//       lighten_3: customTheme.colors.purple.lighten_3,
//       lighten_4: customTheme.colors.purple.lighten_4,
//       lighten_5: customTheme.colors.purple.lighten_5,
//       darken_1: customTheme.colors.purple.darken_1,
//       darken_2: customTheme.colors.purple.darken_2,
//       darken_3: customTheme.colors.purple.darken_3,
//       darken_4: customTheme.colors.purple.darken_4,
//       accent_1: customTheme.colors.purple.accent_1,
//       accent_2: customTheme.colors.purple.accent_2,
//       accent_3: customTheme.colors.purple.accent_3,
//       accent_4: customTheme.colors.purple.accent_4,
//     },
//     grey: {
//       grey: customTheme.colors.grey.grey,
//       lighten_1: customTheme.colors.grey.lighten_1,
//       lighten_2: customTheme.colors.grey.lighten_2,
//       lighten_3: customTheme.colors.grey.lighten_3,
//       lighten_4: customTheme.colors.grey.lighten_4,
//       lighten_5: customTheme.colors.grey.lighten_5,
//       darken_1: customTheme.colors.grey.darken_1,
//       darken_2: customTheme.colors.grey.darken_2,
//       darken_3: customTheme.colors.grey.darken_3,
//       darken_4: customTheme.colors.grey.darken_4,
//     },
//     green: {
//       green: customTheme.colors.green.green,
//       lighten_1: customTheme.colors.green.lighten_1,
//       lighten_2: customTheme.colors.green.lighten_2,
//       lighten_3: customTheme.colors.green.lighten_3,
//       lighten_4: customTheme.colors.green.lighten_4,
//       lighten_5: customTheme.colors.green.lighten_5,
//       darken_1: customTheme.colors.green.darken_1,
//       darken_2: customTheme.colors.green.darken_2,
//       darken_3: customTheme.colors.green.darken_3,
//       darken_4: customTheme.colors.green.darken_4,
//       accent_1: customTheme.colors.green.accent_1,
//       accent_2: customTheme.colors.green.accent_2,
//       accent_3: customTheme.colors.green.accent_3,
//       accent_4: customTheme.colors.green.accent_4,
//     },
//   },
//   typography: {
//     fontFamily: customTheme.fonts.main,
//     h1: {
//       fontFamily: customTheme.fonts.heading,
//       fontSize: customTheme.fontSizes["5xl"],
//     },
//     h2: {
//       fontFamily: customTheme.fonts.heading,
//       fontSize: customTheme.fontSizes["4xl"],
//     },
//     body1: { fontSize: customTheme.fontSizes.md },
//     body2: { fontSize: customTheme.fontSizes.sm },
//   },
// });


// muiTheme.js
import { createTheme } from "@mui/material/styles";
import { theme as customTheme } from "./theme";

export const muiTheme = createTheme({
  spacing: customTheme.spacing, // enables theme.spacing(n)

  palette: {
    mode: "light",
    primary: { main: customTheme.colors.primary },
    secondary: { main: customTheme.colors.secondary },
    error: { main: customTheme.colors.error },
    info: { main: customTheme.colors.info },
    success: { main: customTheme.colors.success },
    warning: { main: customTheme.colors.warning },
    background: {
      default: customTheme.colors.background,
      paper: customTheme.colors.white,
      // non-standard key, fine in JS (TS would need module augmentation)
      background_Dark: customTheme.colors.background_Dark,
    },
    text: {
      primary: customTheme.colors.black,
      secondary: customTheme.colors.grey.darken_2,
    },

    // Custom buckets (not used by MUI internals but handy to keep)
    purple: {
      purple: customTheme.colors.purple.purple,
      lighten_1: customTheme.colors.purple.lighten_1,
      lighten_2: customTheme.colors.purple.lighten_2,
      lighten_3: customTheme.colors.purple.lighten_3,
      lighten_4: customTheme.colors.purple.lighten_4,
      lighten_5: customTheme.colors.purple.lighten_5,
      darken_1: customTheme.colors.purple.darken_1,
      darken_2: customTheme.colors.purple.darken_2,
      darken_3: customTheme.colors.purple.darken_3,
      darken_4: customTheme.colors.purple.darken_4,
      accent_1: customTheme.colors.purple.accent_1,
      accent_2: customTheme.colors.purple.accent_2,
      accent_3: customTheme.colors.purple.accent_3,
      accent_4: customTheme.colors.purple.accent_4,
    },
    grey: {
      grey: customTheme.colors.grey.grey,
      lighten_1: customTheme.colors.grey.lighten_1,
      lighten_2: customTheme.colors.grey.lighten_2,
      lighten_3: customTheme.colors.grey.lighten_3,
      lighten_4: customTheme.colors.grey.lighten_4,
      lighten_5: customTheme.colors.grey.lighten_5,
      darken_1: customTheme.colors.grey.darken_1,
      darken_2: customTheme.colors.grey.darken_2,
      darken_3: customTheme.colors.grey.darken_3,
      darken_4: customTheme.colors.grey.darken_4,
    },
    green: {
      green: customTheme.colors.green.green,
      lighten_1: customTheme.colors.green.lighten_1,
      lighten_2: customTheme.colors.green.lighten_2,
      lighten_3: customTheme.colors.green.lighten_3,
      lighten_4: customTheme.colors.green.lighten_4,
      lighten_5: customTheme.colors.green.lighten_5,
      darken_1: customTheme.colors.green.darken_1,
      darken_2: customTheme.colors.green.darken_2,
      darken_3: customTheme.colors.green.darken_3,
      darken_4: customTheme.colors.green.darken_4,
      accent_1: customTheme.colors.green.accent_1,
      accent_2: customTheme.colors.green.accent_2,
      accent_3: customTheme.colors.green.accent_3,
      accent_4: customTheme.colors.green.accent_4,
    },
  },

  shape: {
    borderRadius: customTheme.radius.md,
  },

  radius: {
    sm: customTheme.radius.sm,
    md: customTheme.radius.md,
    lg: customTheme.radius.lg,
    xl: customTheme.radius.xl,
  },

  typography: {
    // Global font
    fontFamily: customTheme.fonts.main,

    // Headings use Poppins
    h1: {
      fontFamily: customTheme.fonts.heading,
      fontSize: customTheme.fontSizes["5xl"],
      fontWeight: 700,
      lineHeight: 1.15,
    },
    h2: {
      fontFamily: customTheme.fonts.heading,
      fontSize: customTheme.fontSizes["4xl"],
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: customTheme.fonts.heading,
      fontSize: customTheme.fontSizes["3xl"],
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h4: {
      fontFamily: customTheme.fonts.heading,
      fontSize: customTheme.fontSizes["2xl"],
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h5: {
      fontFamily: customTheme.fonts.heading,
      fontSize: customTheme.fontSizes.xl,
      fontWeight: 600,
    },
    h6: {
      fontFamily: customTheme.fonts.heading,
      fontSize: customTheme.fontSizes.lg,
      fontWeight: 600,
    },

    // Body defaults use Roboto
    body1: {
      fontFamily: customTheme.fonts.main,
      fontSize: customTheme.fontSizes.md,
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: customTheme.fonts.main,
      fontSize: customTheme.fontSizes.sm,
      lineHeight: 1.6,
    },

    // Buttons and captions
    button: {
      textTransform: "none",
      fontFamily: customTheme.fonts.main,
      fontWeight: 600,
      letterSpacing: 0.2,
    },
    caption: {
      fontSize: customTheme.fontSizes.xs,
    },
    overline: {
      fontSize: customTheme.fontSizes.xs,
      letterSpacing: 1,
      textTransform: "uppercase",
    },
  },

  components: {
    // Global CSS reset + fonts + background
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: "100%",
        },
        body: {
          height: "100%",
          margin: 0,
          fontFamily: customTheme.fonts.main,
          backgroundColor: customTheme.colors.background,
          color: customTheme.colors.black,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        "#root": {
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
        },
        // Optional scrollbar styling (WebKit)
        "*::-webkit-scrollbar": { width: 8, height: 8 },
        "*::-webkit-scrollbar-thumb": {
          borderRadius: 8,
          backgroundColor: customTheme.colors.grey.lighten_2,
        },
      },
    },

    // Example component-level polish
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: customTheme.radius.lg,
          paddingInline: "1rem",
          paddingBlock: "0.5rem",
        },
        containedPrimary: {
          boxShadow: "none",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: customTheme.radius.lg,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: customTheme.radius.lg,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
});

