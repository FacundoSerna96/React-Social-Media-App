import { SettingsInputSvideoRounded } from '@material-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './conversation.css';

const Conversation = ({conversation, currentUser}) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(()=> {
    const friendId= conversation.members.find(m=>m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${friendId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  },[currentUser, conversation]);
  
  return (
    <div className='conversation'>
        <img 
          className='conversationImg' 
          src={user?.profilePicture? PF+user.profilePicture : PF+'person/no-avatar.png'} 
          alt="" />
        <span className='conversationName'>{user?.username}</span>
    </div>
  )
}

export default Conversation