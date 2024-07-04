
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import React from 'react'

function Link() {
  return (
    <>
    <Link to='/signin'>SignUp</Link>
    <Link to='/send'>Transfer money</Link>
    <Link to='/signup'>SignUp</Link>
    <Link to='/Dashboard'>Dashboard</Link>
    </>
  )
}

export default Link