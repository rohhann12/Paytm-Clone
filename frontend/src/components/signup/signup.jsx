import React, { useState } from 'react';
import {  Link } from "react-router-dom";
import axios from 'axios';
import './signup.css';

function Signup() {
    const [FName, setFName] = useState('');
    const [LName, setLName] = useState('');
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [PhoneNum, setPhoneNum] = useState('');

    async function handleClick() {
        try {
            const response = await axios.post('http://localhost:3000/user/signup', {
                Fname: FName,
                Lname: LName,
                phoneNum: PhoneNum,
                username: Username,
                password: Password
            });
            console.log(response.data.msg);
        } catch (error) {
            console.error('Error signing up:', error);
        }
    }

    return (
        <>
            <div className='container'>
                <h1 className='heading'>Sign Up</h1>
                <p className='heading2'>Enter your credentials to create an<br /> account</p>
                <div className='main'>
                    <input
                        className='firstInput'
                        type="text"
                        placeholder='First Name'
                        value={FName}
                        onChange={(e) => setFName(e.target.value)}
                    />
                    <br />
                    <input
                        className='secondInput'
                        type="text"
                        placeholder='Last Name'
                        value={LName}
                        onChange={(e) => setLName(e.target.value)}
                    />
                    <br />
                    <input
                        className='firstInput'
                        type="text"
                        placeholder='Username'
                        value={Username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br />
                    <input
                        className='secondInput'
                        type="password"
                        placeholder='Password'
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <input
                        className='firstInput'
                        type="text"
                        placeholder='Phone Number'
                        value={PhoneNum}
                        onChange={(e) => setPhoneNum(e.target.value)}
                    />
                    <br />
                    <button onClick={handleClick} className='button'>Sign Up</button>
                    <p>Already a user?<Link>Sign In</Link></p>
                </div>
            </div>
        </>
    );
}

export default Signup;
