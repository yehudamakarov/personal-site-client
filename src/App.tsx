import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { Provider } from "react-redux";
import { Root } from "./root/root";

import axios from "axios";

import { store } from "./store/storeConfig";
// axios.defaults.baseURL = process.env.REACT_APP_API_URL

// https://coolors.co/dce6ea-0e3b43-1e4571-3e505b-357266
const theme = createMuiTheme({
    palette: {
        common: {
            black: "#0B2B31",
            white: "#EDEFF0",
        },
        type: "light",
        primary: {
            main: "#1E4571",
            // light: "rgb(71, 145, 219)",
            // dark: "rgb(17, 82, 147)",
            contrastText: "#F4F7F8",
        },
        secondary: {
            main: "#357266",
            // light: "rgb(227, 51, 113)",
            // dark: "rgb(154, 0, 54)",
            contrastText: "#F4F7F8",
        },
        error: {
            light: "#e57373",
            main: "#f44336",
            dark: "#d32f2f",
            contrastText: "#fff",
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
            A700: "#616161",
        },
        contrastThreshold: 3,
        tonalOffset: 0.3,
        text: {
            primary: "#3E505B",
            secondary: "#616F78",
            disabled: "#959FA5",
            hint: "#959FA5",
        },
        divider: "rgba(0, 0, 0, 0.12)",
        background: {
            paper: "#EDEFF0",
            default: "#EDEFF0",
        },
        action: {
            active: "rgba(0, 0, 0, 0.54)",
            hover: "rgba(0, 0, 0, 0.08)",
            hoverOpacity: 0.08,
            selected: "rgba(0, 0, 0, 0.14)",
            disabled: "rgba(0, 0, 0, 0.26)",
            disabledBackground: "rgba(0, 0, 0, 0.12)",
        },
    },
});

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <React.Fragment>
                    <CssBaseline />
                    {/* <Background /> */}
                    <Root />
                </React.Fragment>
            </Provider>
        </ThemeProvider>
    );
};
