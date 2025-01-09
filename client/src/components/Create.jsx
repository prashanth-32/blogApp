import React, { useState } from 'react'
import '../App.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-router-dom'
import { Navigate } from 'react-router-dom';

export default function Create() {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [file,setFile] = useState('');
  const [redirect,setRedirect] = useState(false);
  const modules = {
    toolbar : [
        [{header:[1,2,false]}],
        ['bold','italic','underline','strike','blockquote'],
        [
            {list : 'ordered'},
            {list : 'bullet'},
            {indent : '-1'},
            {indent : '+1'},
        ],
        ['link','image'],
        ['clean'],
    ],
};
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const info = new FormData();
    info.set('title',title);
    info.set('summary',summary);
    info.set('content',content);
    info.set('file',file[0]);
    const res = await fetch('http://localhost:4000/post',{
      method:'POST',
      body:info,
      credentials:'include',
    })
    if(res.status === 200){
      setRedirect(true);
    }
  }
  if(redirect){
    return <Navigate to={'/'}></Navigate>
  }
  return (
    <div className='box'>
      <input type="text" placeholder='Enter the title'onChange={(e) => setTitle(e.target.value)} value={title}/>
      <input type="summary" placeholder='summary of the blog here..'onChange={(e) => setSummary(e.target.value)} value={summary}/>
      <input type="file" onChange={e => setFile(e.target.files)}/>
      <ReactQuill value={content} onChange={newValue => setContent(newValue)} modules={modules} theme={'snow'}/>
      <button onClick={(e)=> handleSubmit(e)}>Create Blog!</button>
    </div>
  )
}
