import React, { useState } from 'react'
import axios from 'axios'
function send() {
    const [Amount,setAmount]=useState("")
    const [userId,setUserId]=useState("")
  async function handleClick(){
    try {
       const response= await axios.post("http:localhost:3000/account/transfer",{
            to:userId,
            Amount:Amount
        })
        console.log(response.data); 
    } catch (error) {
        console.log(error)
    }
  }
    return (
    <>
    <input type="text"
    placeholder='Enter UserId'
    value={userId}
    onChange={(e)=>{
        setUserId(e.target.value)
    }}
    />
    <input type="text"
    placeholder='Enter Amount'
    value={Amount}
    onChange={(e)=>{
        setAmount(e.target.value)
    }}
    />
    <button onClick={handleClick}>Send Money</button>
    </>
  )
}

export default send