import { createTheme } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';

const palette = {
  ink: '#1B1F3B',
  indigo: '#3C3FA0',
  indigoDark: '#2B2E78',
  amber: '#C9892A',
  surface: '#F7F7FB',
  surfaceRaised: '#FFFFFF',
  border: '#E4E4F0',
  navy: '#0B2545',
  navyDark: '#081A33',
};

export const navyColor = palette.navy;
export const navyColorDark = palette.navyDark;

export const theme = createTheme(
  {
    direction: 'rtl',
    palette: {
      mode: 'light',
      primary: {
        main: palette.indigo,
        dark: palette.indigoDark,
        light: '#6A6DC4',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: palette.amber,
        contrastText: '#FFFFFF',
      },
      background: {
        default: palette.surface,
        paper: palette.surfaceRaised,
      },
      text: {
        primary: palette.ink,
        secondary: '#5C5F7A',
      },
      divider: palette.border,
      error: { main: '#C13B3B' },
      warning: { main: '#C9892A' },
      success: { main: '#2E8B57' },
      info: { main: '#3C6FA0' },
    },
    shape: {
      borderRadius: 10,
    },
    typography: {
      fontFamily: ['Vazirmatn', 'Arial'].join(','),
      h1: { fontWeight: 700 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 500 },
      h4: { fontWeight: 400 },
      h5: { fontWeight: 400 },
      h6: { fontWeight: 400 },
      button: { fontWeight: 600, textTransform: 'none' },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 8 },
          startIcon: {
            marginInlineEnd: 8,
            marginInlineStart: -2,
          },
          endIcon: {
            marginInlineStart: 8,
            marginInlineEnd: -2,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: palette.ink,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 600 },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            textAlign: 'center',
          },
          head: {
            fontWeight: 700,
            backgroundColor: palette.surface,
          },
        },
      },
    },
  },
  faIR
);