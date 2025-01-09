import React, { useState } from 'react'
import "../Login/Login.css"


export default function Register() {
  const [name,setName] = useState("");
  const [pass,setPass] = useState("");

  async function handleRegister(event) {
    event.preventDefault();
    const res = await fetch("http://localhost:4000/register",{
      method:'POST',
      body:JSON.stringify({username:name,password:pass}),
      headers:{'Content-type':'application/json'},
    })
    if(res.status === 200){
      alert("Success!");
    }
    else alert("Failed!");
  }
  return (
    <>
      <h2>Register</h2>
      <form action="" className='Register'>
        <input type="text" placeholder='Enter username' value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="password"placeholder='Enter password' value={pass} onChange={(e)=>setPass(e.target.value)}/>
        <button onClick={()=>handleRegister(event)}>Register</button>
      </form>
    </>
  )
};
