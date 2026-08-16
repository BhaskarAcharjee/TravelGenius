import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0EA5E9", // Vibrant Cyan-Blue
      light: "#38BDF8",
      dark: "#0284C7",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#10B981", // Emerald Green
      light: "#34D399",
      dark: "#059669",
      contrastText: "#FFFFFF",
    },
    accent: {
      main: "#8B5CF6", // Purple / Indigo highlight
      light: "#A78BFA",
      dark: "#7C3AED",
    },
    background: {
      default: "#F8FAFC", // Slate-50 background
      paper: "#FFFFFF",
      darkPaper: "#0F172A",
    },
    text: {
      primary: "#0F172A", // Slate 900
      secondary: "#475569", // Slate 600
    },
    divider: "rgba(226, 232, 240, 0.8)",
  },
  typography: {
    fontFamily: [
      '"Plus Jakarta Sans"',
      '"Inter"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.025em",
    },
    h2: {
      fontWeight: 800,
      letterSpacing: "-0.025em",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    "none",
    "0px 1px 3px rgba(15, 23, 42, 0.05)",
    "0px 4px 6px -1px rgba(15, 23, 42, 0.08), 0px 2px 4px -1px rgba(15, 23, 42, 0.04)",
    "0px 10px 15px -3px rgba(15, 23, 42, 0.08), 0px 4px 6px -2px rgba(15, 23, 42, 0.03)",
    "0px 20px 25px -5px rgba(15, 23, 42, 0.1), 0px 10px 10px -5px rgba(15, 23, 42, 0.04)",
    ...Array(20).fill("0px 25px 50px -12px rgba(15, 23, 42, 0.25)"),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
          fontSize: "0.95rem",
          boxShadow: "none",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 10px 20px -5px rgba(14, 165, 233, 0.3)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)",
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: "1px solid rgba(226, 232, 240, 0.8)",
          boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
