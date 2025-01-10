import { useState, useEffect } from "react";
import Post from "./Post"; 

export default function Content() {
  const [posts,setPost] = useState([])
  useEffect(() => {
    async function fetchData(){
    const res = await fetch('https://blogapp-backend-1apt.onrender.com/post');
    const data = await res.json();
    setPost(data);
    }
    fetchData();
  },[])
  function display(){
    posts.map(post => console.log(post));
  }
  return (
    <>
    {/* {posts.length > 0 && display()} */}
      {posts.length > 0 && posts.map(post =>(
        <Post {...post} key={post._id}/>
      ))}
    </>
  );
}