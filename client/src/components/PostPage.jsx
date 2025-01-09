import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { format } from 'date-fns';
import { UserContext } from './UserContext';


export default function PostPage() {
    const params = useParams()
    const [info,setInfo] = useState(null);
    const {userInfo} = useContext(UserContext);
    const [redirect,setRedirect] = useState(false);
    useEffect(()=>{
        const id = params.id;
        fetch(`http://localhost:4000/post/${id}`)
        .then(res => res.json()
        .then(e => {
            setInfo(e);
        })
    );
    },[]);
    const deletePost = async () =>{
        let res = await fetch(`http://localhost:4000/delete/${params.id}`,{
            method:'delete',
            body:JSON.stringify({'id' : params.id}),
        })
        res = await res.json();
        if(res){
            setRedirect(true);
        }
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    if(!info) return ( <div className='loading'>Loading....</div> );
      return (
    <div className="postContainer">
        <div className="postImg">
          <img src={'http://localhost:4000/'+  info.cover} alt="" />
        </div>
        <div className="postDescription">
            <h1>{info.title}</h1>
            <div className='postContent' dangerouslySetInnerHTML={{__html:info.content}}></div>
            <div className="postAuthor">Created by {info.author.username} at {format(new Date(info.createdAt), 'MMM d, yyyy HH:mm')}</div>
       </div>
       <div className="btn">
          {info.author._id === userInfo.id ? <Link to={`/edit/${info._id}`}><button>Edit</button></Link>: <div></div>}
          {info.author._id === userInfo.id ? <button onClick={()=> deletePost()}>Delete</button>: <div></div> }
       </div>
      </div>
  )
}
