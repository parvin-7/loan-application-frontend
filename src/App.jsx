import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import React from "react"
import LoanForm from "./pages/LoanForm"

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}>
          <Route path="signup" element={<Signup/>}></Route>
          <Route path="login" element={<Login/>}></Route>
          </Route>
          <Route path="/application" element={<LoanForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
