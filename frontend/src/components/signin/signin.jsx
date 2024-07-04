import React, { useState } from 'react'
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import axios from 'axios'
import './signin.css'
function signup() {
    const  [Username,setUsername]=useState('')
    const  [Password,setPassword]=useState('')
    async function handleClick() {
        try {
          const response = await axios.post('http://localhost:3000/user/signin', {
            username:Username,
            password:Password
          });
          console.log(response.data.msg); 
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
  return (
    <>
    <div className='container'>
    <h1 className='heading'>Sign In</h1>
    <p className='heading2'>Enter your information to create an <br /> account</p>
    <div className='main'>
    <input
    className='firstInput'
    type="text"
    placeholder='username' 
    value={Username}
    onChange={(e)=>{
        setUsername(e.target.value)
    }}
    />
    <br />
    <input 
     className='secondInput'
    type="password"
    placeholder='Password' 
    value={Password}
    onChange={(e)=>{
        setPassword(e.target.value)
    }}
    />
    <br />
    <button onClick={handleClick}
    className='button'
    >Sign In</button>
    <p className='LastLine'>New User?</p>
    <Link to='/signup'>Sign Up first!</Link>
    </div>
    </div>
    </>
  )
}

export default signup