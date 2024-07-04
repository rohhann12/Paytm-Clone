import axios from 'axios'
import React, { useState } from 'react'

function checkBal() {
    const [user,setUser]=useState("")
    async function handleClick(){
        try {
            const response = axios.post("http:localhost:3000/account/checkBalance",{
                userId:user
            })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
    <input type="text"
     placeholder='enter user id'
     value={user}
     onChange={(e)=>{setUser(e.target.value)
     }}
     />
     <button onClick={handleClick}>Check balance</button>
    </>
  )
}

export default checkBal