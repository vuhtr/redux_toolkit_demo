import React from "react"
import { Routes, Route } from "react-router-dom"
import RoutesConfig from "./RoutesConfig"

const MyRoutes = () => {
  return (
      <Routes>
        {RoutesConfig.map(({ path, element }, index) => (
          <Route key={`route-${index}`} path={path} element={element} />
        ))}
      </Routes>
  )
}

export default MyRoutes