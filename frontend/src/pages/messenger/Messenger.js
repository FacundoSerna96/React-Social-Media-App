import './messenger.css';

import {Topbar} from '../../components/topbar/Topbar'
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatOnline/ChatOnline';

import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

import {io} from 'socket.io-client';

const Messenger = () => {
    const [conversations , setConversations] = useState([]);
    const [currentChat , setCurrentChat] = useState(null);
    const [messages , setMessages] = useState([]);
    const [newMessages , setNewMessages] = useState('');
    const [arrivalMessage , setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef(io('ws://localhost:8900'));
    const {user} = useContext(AuthContext);
    const scrollRef = useRef();


    useEffect(()=>{
        //nos conectamos al socket
        socket.current = io('ws://localhost:8900');


        socket.current.on('getMessage', data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createAt: Date.now(),
            })
        });
    },[]);

    useEffect(()=> {
        arrivalMessage && 
            currentChat?.members.includes(arrivalMessage.sender) && 
            setMessages((prev)=>[...prev, arrivalMessage])
    },[arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit('addUser', user._id);
        socket.current.on('getUsers', (users)=>{
            console.log('Usuarios conectado del socket',users);
            console.log('Usuario del contexto',user)
            setOnlineUsers(
                users
            );
            console.log('Usuarios online despues del filtro', onlineUsers);
        });
    },[user]);


   /*  useEffect(() => {
        
    },[socket]); */


    useEffect(()=> {
        const getConversations = async () => {
            try {
                const res = await axios.get(`/conversations/${user._id}`);
                setConversations(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getConversations();
    },[user._id]);


    useEffect(()=> {
        const getMessages = async () => {
            try {
                const res = await axios.get(`/messages/${currentChat?._id}`);
                setMessages(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getMessages();
    },[currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessages,
            conversationId : currentChat._id
        };


        //mandando mensaje por socket
        //obtenemos el id del receiver
        //que serian todos los usuarios 
        //del grupo menos uno mismo
        const receiverId = currentChat.members.find(member=>member != user._id);

        socket.current.emit('sendMessage', {
            senderId: user._id,
            receiverId,
            text: newMessages
        });

        try {
            const res = await axios.post('/messages', message);
            setMessages([...messages, res.data]);
            setNewMessages('');
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(()=> {
        //al detectar un cambio en los mensajes
        //screollea al ultimo mensaje
        //con un efecto suave (smooth)
        scrollRef.current?.scrollIntoView({behavior:'smooth'});
    }, [messages]);

  return (
      <>
        <Topbar />
        <div className='messenger'>
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder='Search for friends' className='chatMenuInput'/>
                    {conversations.map(c=>(
                        <div className="" onClick={()=>setCurrentChat(c)}>
                            <Conversation key={c._id} conversation={c} currentUser={user}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        currentChat ? 
                        
                    <>
                        <div className="chatBoxTop">

                            {messages.map(m=>(
                                <dir ref={scrollRef}>
                                    <Message key={m._id} message={m} own={m.sender === user._id}/>
                                </dir>
                            ))}
                            
                        </div>
                        <div className="chatBoxBottom">
                            <textarea 
                                className='chatMessageInput' 
                                placeholder='Write something...'
                                onChange={(e) => setNewMessages(e.target.value)}
                                value={newMessages}>
                            </textarea>
                            <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                        </div>
                    </> : 
                        <span className='noConversationText'>
                            Open a conversation to start a chat.
                        </span>}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>
                </div>
            </div>
        </div>
      </>
  )
}

export default Messenger