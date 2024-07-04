
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import Signup from "./components/signup/signup.jsx"
import Dashboard from "./components/dashboard";
import Signin from "./components/signin/signin.jsx";
import Send from "./components/send";
import React from 'react'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Send/>}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/send" element={<Send />} />
          <Route path="*" element={<h1>Route does not exist</h1>}/>
        </Route>
      </Routes>
      
    </BrowserRouter>
  );
}