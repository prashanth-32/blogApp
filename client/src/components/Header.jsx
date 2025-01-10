import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'

export default function Header() {
    const {userInfo,setInfo} = useContext(UserContext)
    useEffect(() => {
        fetch('https://blogapp-backend-1apt.onrender.com/profile',{
            credentials:'include',
        }).then(res =>{
            res.json().then(info =>{
                setInfo(info);
            })
        })
    },[])
    const handleLogout = async() =>{
       fetch('https://blogapp-backend-1apt.onrender.com/logout',{
            credentials:'include',
            method:'POST'
        }).then(()=>setInfo(null));
    }
    return (
        <>
            <div className="top">
                <div className="logo">
                    <Link to="/" className='logoLink'>MyBlog</Link>
                </div>
                <div className="login">
                    {userInfo?.username ? 
                        <div className='flex'>
                            <Link to="create" className=''>Create</Link>
                            <button onClick={() => handleLogout()}>Logout</button>
                        </div> 
                        :
                        <div className='flex'>
                            <Link to="/login" className=''>Login</Link>
                            <Link to="/register" className=''>Register</Link>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
