import React from 'react';
import { CssBaseline, createMuiTheme } from "@material-ui/core";
import Background from './root/background';
import Root from "./root/root"
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from "react-redux"
import store from './store/storeConfig';

// https://coolors.co/dce6ea-0e3b43-1e4571-3e505b-357266
const theme = createMuiTheme({
    palette: {
        common: {
            black: "#0B2B31",
            white: "#E8EFF1"
        },
        type: "light",
        primary: {
            main: "#1E4571",
            // light: "rgb(71, 145, 219)",
            // dark: "rgb(17, 82, 147)",
            contrastText: "#E8EFF1"
        },
        secondary: {
            main: "#357266",
            // light: "rgb(227, 51, 113)",
            // dark: "rgb(154, 0, 54)",
            contrastText: "#E8EFF1"
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
        tonalOffset: 0.3,
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
            <Provider store={store}>
                <React.Fragment>
                    <CssBaseline />
                    <Background />
                    <Root />
                </React.Fragment>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
