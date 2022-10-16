import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import { createTheme, ThemeProvider } from "@mui/material"
import { StyledEngineProvider } from "@mui/material/styles"

import { Provider } from "react-redux"

import store from "redux/store"
import { COLORS } from "constants"
import App from "./App"

import "./index.scss"

const theme = createTheme({
    palette: {
        primary: {
            main: COLORS.primary,
            light: COLORS.primaryLight,
            dark: COLORS.primaryDark,
        },
        secondary: {
            main: COLORS.secondary,
        },
    },
})

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst>
                <BrowserRouter>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </BrowserRouter>
            </StyledEngineProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
)
