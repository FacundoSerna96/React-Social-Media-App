import './message.css';

import {format} from 'timeago.js';

const Message = ({message, own}) => {
  return (
    <div className={own ? 'message own' : 'message'}>
        <div className="messageTop">
            <img 
                className='messageImg' 
                src="https://avatarfiles.alphacoders.com/843/84386.jpg" 
                alt="" />
            <p className='messageText'>{message?.text}</p>
        </div>

        <div className="messageBottom">
            {format(message.createdAt)}
        </div>

    </div>
  )
}

export default Message