import {useContext, useEffect, useState} from 'react'

import axios from 'axios';

import Share from '../share/Share';
import Post from '../post/Post';

import {AuthContext} from '../../context/AuthContext';

import './feed.css';

const Feed = ({username}) => {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username 
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`posts/timeline/${user._id}`);
      setPosts(res.data.sort((p1,p2) => {
        //ordena los post del feed de acuerdo a la fecha de creacion
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })); 
    };
    fetchPosts();
  },[username, user._id]);
  
  return (
    <div className='feed'>
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share /> }
        {posts.map(p=>(
          <Post key={p._id} post={p}/>
        ))}

      </div>
    </div>
  )
}

export default Feed