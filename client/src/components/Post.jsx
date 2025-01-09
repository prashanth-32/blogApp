import React from 'react'
import 'date-fns'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function Post({title,summary,content,createdAt,cover,author,_id}) {
   {/* <div className="blogs">
        <div className="blog">
          <Link to={'/post/id'}>
          <div className="img">
            <img src={'http://localhost:4000/'+  cover} alt=""/>
          </div>
          </Link>
          <div className="desc">
            <Link to={'/post/id'}><h2 className='title'>{title}</h2></Link>
          <p className='context'>{summary}</p>
          <p className='content'>{htmltoText(content)}</p>
          <p className='info'>Posted on {format(new Date(createdAt), 'MMM d, yyyy HH:mm')} by {author.username}</p>
          </div>
        </div>
      </div> */}
  return (
      <div className="container">
        <div className="left">
          <img src={'http://localhost:4000/'+  cover} alt="" />
        </div>
        <div className="right">
          <p className='title'>{title}</p>
          <p className='summary'>{summary}</p>
          <p className='posted'>Posted on {format(new Date(createdAt), 'MMM d, yyyy HH:mm')} by {author.username}</p>
          <Link to={`/post/${_id}`}>
            <button className='btn'>Read More..</button>
          </Link>
        </div>
      </div>
  )
}

