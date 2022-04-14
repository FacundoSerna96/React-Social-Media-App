import axios from 'axios';
import { useEffect, useState } from 'react'
import './chatOnline.css'

const ChatOnline = ({onlineUsers, currentId, setCurrentChat}) => {

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  useEffect(()=>{
    //obtiene los datos de los amigos del usuario
    //para asi mostrarlo en la lista de online
    const getFriends = async()=>{
      try {
        const res = await axios.get(`/users/friends/${currentId}`);
        console.log('resultado de obtenre amigos', res.data);
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getFriends();
  },[currentId]);


  //filtra de la lista de conectados solo los amigos
  useEffect(()=>{
    //setOnlineFriends(onlineUsers);
    console.log('amigos',friends);
    console.log('OnlineUSers', onlineUsers)



    //const amigosOnline = friends.filter((f) => onlineUsers.includes(f._id))
    const amigosOnline = friends.filter((f) => onlineUsers.some((u) => u.userId === f._id))
    console.log('amigos Online', amigosOnline);
    setOnlineFriends(amigosOnline);



    console.log('OnlineFriends',onlineFriends);
  },[friends, onlineUsers]);

  
  /* console.log('onlineFriends',onlineFriends); */

  return (
    <div className='chatOnline'>
      {onlineFriends.map((o) =>(
        <div className="chatOnlineFriends">
            <div className="chatOnlineImgContainer">
                <img 
                    className='chatOnlineImg' 
                    src={o?.profilePicture? PF+o.profilePicture : PF+'person/no-avatar.png'} 
                    alt="" 
                />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineUser">{o?.username}</span>
        </div>
      ))}
    </div>
  )
}

export default ChatOnline