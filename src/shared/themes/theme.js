

// // theme.js
// export const theme = {
//   colors: {
//     primary: "#4B18A1",
//     secondary: "#6D28AA",
//     accent: "#EAA2DB",
//     error: "#FF5252",
//     info: "#2196F3",
//     success: "#4CAF50",
//     warning: "#FB8C00",
//     background: "#FFFFFF",
//     black: "#000000",
//     white: "#FFFFFF",
//     background_Dark: "#140036",
//     purple:{
//       purple: "#9c27b0",
//       lighten_1: "#AB47BC",
//       lighten_2: "#BA68C8",
//       lighten_3: "#CE93D8",
//       lighten_4: "#E1BEE7",
//       lighten_5: "#F3E5F5",
//       darken_1: "#8e24aa",
//       darken_2: "#7b1fa2",
//       darken_3: "#6a1b9a",
//       darken_4: "#4a148c",
//       accent_1: "#ea80fc",
//       accent_2: "#e040fb",
//       accent_3: "#d500f9",
//       accent_4: "#aa00ff",
//     },
//     grey:{
//       grey: "#9E9E9E",
//       lighten_1: "#bdbdbd",
//       lighten_2: "#e0e0e0",
//       lighten_3: "#eeeeee",
//       lighten_4: "#f5f5f5",
//       lighten_5: "#fafafa",
//       darken_1: "#757575",
//       darken_2: "#616161",
//       darken_3: "#424242",
//       darken_4: "#212121",
//     },
//     green: {
//       green: "#4CAF50",
//       lighten_1: "#66BB6A",
//       lighten_2: "#81C784",
//       lighten_3: "#A5D6A7",
//       lighten_4: "#C8E6C9",
//       lighten_5: "#E8F5E9",
//       darken_1: "#43A047",
//       darken_2: "#388E3C",
//       darken_3: "#2E7D32",
//       darken_4: "#1B5E20",
//       accent_1: "#B9F6CA",
//       accent_2: "#69F0AE",
//       accent_3: "#00E676",
//       accent_4: "#00C853",
//     },
//   },
//   fonts: {
//     main: "'Roboto', sans-serif",
//     heading: "'Roboto', sans-serif",
//     roboto: {
//       thin: "'Roboto Thin', sans-serif",
//       light: "'Roboto Light', sans-serif",
//       regular: "'Roboto Regular', sans-serif",
//       medium: "'Roboto Medium', sans-serif",
//       bold: "'Roboto Bold', sans-serif",
//       black: "'Roboto Black', sans-serif",
//     },
//   },
//   fontSizes: {
//     xs: "0.75rem",   // 12px
//     sm: "0.875rem",  // 14px
//     md: "1rem",      // 16px
//     lg: "1.125rem",  // 18px
//     xl: "1.25rem",   // 20px
//     "2xl": "1.5rem", // 24px
//     "3xl": "1.875rem", // 30px
//     "4xl": "2.25rem",  // 36px
//     "5xl": "3rem",     // 48px
//   },
// };


// theme.js
export const theme = {
  colors: {
    primary: "#4B18A1",
    secondary: "#6D28AA",
    accent: "#EAA2DB",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    background: "#FFFFFF",
    black: "#000000",
    white: "#FFFFFF",
    background_Dark: "#140036",

    purple: {
      purple: "#9c27b0",
      lighten_1: "#AB47BC",
      lighten_2: "#BA68C8",
      lighten_3: "#CE93D8",
      lighten_4: "#E1BEE7",
      lighten_5: "#F3E5F5",
      darken_1: "#8e24aa",
      darken_2: "#7b1fa2",
      darken_3: "#6a1b9a",
      darken_4: "#4a148c",
      accent_1: "#ea80fc",
      accent_2: "#e040fb",
      accent_3: "#d500f9",
      accent_4: "#aa00ff",
    },

    grey: {
      grey: "#9E9E9E",
      lighten_1: "#bdbdbd",
      lighten_2: "#e0e0e0",
      lighten_3: "#eeeeee",
      lighten_4: "#f5f5f5",
      lighten_5: "#fafafa",
      darken_1: "#757575",
      darken_2: "#616161",
      darken_3: "#424242",
      darken_4: "#212121",
    },

    
    green: {
      green: "#4CAF50",
      lighten_1: "#66BB6A",
      lighten_2: "#81C784",
      lighten_3: "#A5D6A7",
      lighten_4: "#C8E6C9",
      lighten_5: "#E8F5E9",
      darken_1: "#43A047",
      darken_2: "#388E3C",
      darken_3: "#2E7D32",
      darken_4: "#1B5E20",
      accent_1: "#B9F6CA",
      accent_2: "#69F0AE",
      accent_3: "#00E676",
      accent_4: "#00C853",
    },
  },

  fonts: {
    // Global defaults
    main: "'Roboto', sans-serif",
    heading: "'Poppins', sans-serif",

    // Optional named weights
    roboto: {
      thin: "'Roboto', sans-serif",
      light: "'Roboto', sans-serif",
      regular: "'Roboto', sans-serif",
      medium: "'Roboto', sans-serif",
      bold: "'Roboto', sans-serif",
      black: "'Roboto', sans-serif",
    },
    poppins: {
      regular: "'Poppins', sans-serif",
      medium: "'Poppins', sans-serif",
      bold: "'Poppins', sans-serif",
    },
  },

  fontSizes: {
    xs: "0.75rem",      // 12px
    sm: "0.875rem",     // 14px
    md: "1rem",         // 16px
    lg: "1.125rem",     // 18px
    xl: "1.25rem",      // 20px
    "2xl": "1.5rem",    // 24px
    "3xl": "1.875rem",  // 30px
    "4xl": "2.25rem",   // 36px
    "5xl": "3rem",      // 48px
  },

  // Optional radius/spacing tokens if you want them in overrides
  radius: {
    sm: 2,
    md: 4,
    lg: 6,
    xl: 8,
  },
  spacing: 8, // base spacing unit for MUI createTheme spacing()
};
