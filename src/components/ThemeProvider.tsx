"use client"

import {ReactNode} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {indigo, green} from "@mui/material/colors";

export default function RootLayout({children,}: Readonly<{
    children: ReactNode;
}>) {
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: indigo[400],
            },
            secondary: {
                main: green[500],
            },
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
