import React, { useEffect,useState } from 'react'
import { useParams,Navigate } from 'react-router-dom'
import ReactQuill from 'react-quill';

export default function EditPost() {
    const params = useParams()
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [id,setId] = useState('');
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
    useEffect(()=>{
        fetch(`https://blogapp-backend-1apt.onrender.com/edit/${params.id}`)
        .then(res => res.json()
        .then(res =>{
            setTitle(res.title),
            setSummary(res.summary),
            setContent(res.content),
            setId(res.author)
        }
        )
    )
    },[])

    const updateBlog = async (e) =>{
        e.preventDefault();
        const info = new FormData();
        info.set('title',title);
        info.set('summary',summary);
        info.set('content',content);
        info.set('id',id);
        if(file?.[0]){
            info.set('file',file[0]);
        }
        const res = await fetch(`https://blogapp-backend-1apt.onrender.com/update/${params.id}`,{
        method:'PUT',
        body:info,
        credentials:'include',
        })
        if(res.ok){
        setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={'/post/' + params.id}></Navigate>
    }
  return (
    <div className='box'>
          <input type="text" placeholder='Enter the title'onChange={(e) => setTitle(e.target.value)} value={title}/>
          <input type="summary" placeholder='summary of the blog here..'onChange={(e) => setSummary(e.target.value)} value={summary}/>
          <input type="file" onChange={e => setFile(e.target.files)}/>
          <ReactQuill value={content} onChange={newValue => setContent(newValue)} modules={modules} theme={'snow'}/>
          <button onClick={(e)=> updateBlog(e)}>Update Blog!</button>
    </div>
  )
}
