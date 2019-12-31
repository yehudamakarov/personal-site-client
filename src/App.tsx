import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { Provider } from "react-redux";
import { Root } from "./root/root";
import { store } from "./store/storeConfig";

// https://coolors.co/dce6ea-0e3b43-1e4571-3e505b-357266
const theme = createMuiTheme({
    overrides: {
        MuiCheckbox: {
            root: { color: "#F0F2EF" },
        },
    },
    palette: {
        action: {
            active: "rgba(0, 0, 0, 0.54)",
            disabled: "rgba(0, 0, 0, 0.26)",
            disabledBackground: "rgba(0, 0, 0, 0.12)",
            hover: "rgba(0, 0, 0, 0.08)",
            hoverOpacity: 0.08,
            selected: "rgba(0, 0, 0, 0.14)",
        },
        background: {
            default: "#dbddde",
            paper: "#EDEDED",
        },
        common: {
            black: "#12171A",
            white: "#F0F2EF",
        },
        contrastThreshold: 3,
        divider: "rgba(0, 0, 0, 0.12)",
        error: {
            contrastText: "#fff",
            dark: "#d32f2f",
            light: "#e57373",
            main: "#f44336",
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
        secondary: {
            // contrastText: "#F0F2EF",
            // dark: "#182023",
            light: "#7d856a",
            main: "#49523d",
        },
        primary: {
            // contrastText: "#12171A",
            dark: "#1a2529",
            light: "#415c66",
            main: "#2e4249",
        },
        text: {
            disabled: "#959FA5",
            hint: "#959FA5",
            primary: "#3E505B",
            secondary: "#616F78",
        },
        tonalOffset: 0.3,
        type: "light",
    },
    typography: {
        // fontFamily: "'Exo 2', sans-serif",
        fontFamily: "'Noto Sans TC', sans-serif",
        fontSize: 12,
        h3: {
            fontWeight: 500,
        },
        h4: {
            fontWeight: 500,
            textTransform: "uppercase",
        },
        h5: {
            fontSize: "1.5rem",
            fontWeight: 500,
            textTransform: "uppercase",
        },
        h6: {
            fontSize: "1.35rem",
        },
        overline: {
            letterSpacing: 1.1,
            lineHeight: 2.1,
        },
        subtitle2: {
            fontSize: "0.9rem",
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
