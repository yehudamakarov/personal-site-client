import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { Provider } from "react-redux";
import { Root } from "./root/root";
import { store } from "./store/storeConfig";

// https://coolors.co/dce6ea-0e3b43-1e4571-3e505b-357266
const theme = createMuiTheme({
    overrides: {
        // MuiCheckbox: {
        //     root: { color: "#F0F2EF" },
        // },
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
            default: "#F2F7F2",
            paper: "#F6F7F6",
        },
        common: {
            black: "#212121",
            white: "#FAFCFD",
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
            50: "#F7F8F9",
            100: "#EEF0F2",
            200: "#E9EBEE",
            300: "#E1E4E8",
            400: "#B9BBBE",
            500: "#94999E",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121",
            A100: "#d5d5d5",
            A200: "#aaaaaa",
            A400: "#303030",
            A700: "#616161",
        },
        primary: {
            contrastText: "#f0f6fb",
            // light: "#445D77",
            main: "#19395D",
        },
        secondary: {
            // main: "#3F5642",
            main: "#367C40",
        },
        text: {
            // disabled: "#959FA5",
            // hint: "#959FA5",
            // primary: "#232323",
            // secondary: "#616F78",
        },
        // tonalOffset: 0.3,
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
