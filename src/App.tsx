import React from 'react';
import { CssBaseline, createMuiTheme } from "@material-ui/core";
import Root from './Root/Root';
import { ThemeProvider } from '@material-ui/styles';

// https://coolors.co/dce6ea-0e3b43-1e4571-3e505b-357266
const theme = createMuiTheme({
    palette: {
        common: {
            black: "#000",
            white: "#fff"
        },
        type: "light",
        primary: {
            main: "#1976d2",
            light: "rgb(71, 145, 219)",
            dark: "rgb(17, 82, 147)",
            contrastText: "#fff"
        },
        secondary: {
            main: "rgb(220, 0, 78)",
            light: "rgb(227, 51, 113)",
            dark: "rgb(154, 0, 54)",
            contrastText: "#fff"
        },
        error: {
            light: "#e57373",
            main: "#f44336",
            dark: "#d32f2f",
            contrastText: "#fff"
        },
        grey: {
            50: "#fafafa",
            100: "#f5f5f5",
            200: "#eeeeee",
            300: "#e0e0e0",
            400: "#bdbdbd",
            500: "#9e9e9e",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121",
            A100: "#d5d5d5",
            A200: "#aaaaaa",
            A400: "#303030",
            A700: "#616161"
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
        text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.54)",
            disabled: "rgba(0, 0, 0, 0.38)",
            hint: "rgba(0, 0, 0, 0.38)"
        },
        divider: "rgba(0, 0, 0, 0.12)",
        background: {
            paper: "#DCE6EA",
            default: "#fff"
        },
        action: {
            active: "rgba(0, 0, 0, 0.54)",
            hover: "rgba(0, 0, 0, 0.08)",
            hoverOpacity: 0.08,
            selected: "rgba(0, 0, 0, 0.14)",
            disabled: "rgba(0, 0, 0, 0.26)",
            disabledBackground: "rgba(0, 0, 0, 0.12)"
        }
    }
})


function App() {
    return (
        <ThemeProvider theme={theme}>
            < React.Fragment >
                <CssBaseline />
                <Root />
            </React.Fragment >
        </ThemeProvider>
    );
}

export default App;
