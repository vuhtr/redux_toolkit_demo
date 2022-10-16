import React from "react"

import CssBaseline from "@mui/material/CssBaseline"
import { useLocation } from "react-router-dom"

import { Navbar } from "./components/Navbar"

import MyRoutes from "./routes"

function App() {
    const location = useLocation()
    const path = location.pathname
    const isIsolatedPage = path.includes("login") || path.includes("signup")

    return (
        <React.Fragment>
            <CssBaseline />
            <div className="App">
                {!isIsolatedPage && <Navbar />}
                <MyRoutes />
                {/* <Footer /> */}
            </div>
        </React.Fragment>
    )
}

export default App