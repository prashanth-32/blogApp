import React, { useContext, useState } from 'react'
import "./Login.css"
import 'react-router-dom'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';


export default function Login() {
  const [username,setUser] = useState("");
  const [password,setPass] = useState("");
  const [redirect,setRedirect] = useState(false);
  const {userInfo,setInfo} = useContext(UserContext);
  async function handleSubmit(event){
    event.preventDefault();
    const res = await fetch('https://blogapp-backend-1apt.onrender.com/login',{
      method : 'POST',
      body:JSON.stringify({username:username,password:password}),
      headers:{
        'Content-type' : 'application/json'
      },
      credentials:'include',
    })
    if(res.ok){
      res.json().then(userInfo => setInfo(userInfo));
      setRedirect(true);
    }
  }
  if(redirect){
    return <Navigate to='/'/>
  }
  return (
    <>
        <h2>Login</h2>
        <form action="" className='Login'>
            <input type="text" name="" id="" placeholder='Enter username' value={username} onChange={(e)=>setUser(e.target.value)}/>
            <input type="password" name="" id="" placeholder='Enter password' value={password} onChange={(e)=>setPass(e.target.value)}/>
            <button onClick={()=>handleSubmit(event)}>Login</button>
        </form>
    </>
  )
}
