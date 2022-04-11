import './rightbar.css'

import {Users} from '../../dummyData'
import Online from '../online/Online'
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

import {Add, Remove} from '@material-ui/icons';

const Rightbar = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends,setFriends] = useState([]);
  const {user:currentUser, dispatch} = useContext(AuthContext);

  const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));

  
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`/users/friends/${user._id}`);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    }
    getFriends();
  }, [user]);
  
  
 /*  useEffect(() => {
    console.log("effect "+currentUser.followings.includes(user?.id));
    setFollowed(currentUser.followings.includes(user?.id));
  },[currentUser]); */

  const handleClick = async () => {
    try {
      if(followed){
        await axios.put(`/users/${user._id}/unfollow`, {userId:currentUser._id});
        dispatch({type:'UNFOLLOW', payload:user._id});
        setFollowed(false);
      }else{
        await axios.put(`/users/${user._id}/follow`, {userId:currentUser._id});
        dispatch({type:'FOLLOW', payload:user._id});
        setFollowed(true);
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  const HomeRightbar = () => {
    return(
      <>
        <div className="birthdateContainer">
            <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
            <span className='birthdayText'>
              <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
            </span>
        </div>
        <img className='rightbarAd' src={`${PF}ad.png`} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(u=>(
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    )
  }


  const ProfileRightbar = () => {
    return(
      <>
        {user.username !== currentUser.username && (
            <button className="rightbarFollowButton" onClick={handleClick}>
              {followed ? 'Unfollow' : 'Follow'}
              {followed ? <Remove/> : <Add/>}
            </button>
          )}
        <h4 className='rightbarTitle'>User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? 'Single'
                                                 : user.relationship === 2 ? 'Married'
                                                 : ''}</span>
          </div>
        </div>
        <h4 className='rightbarTitle'>User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map(friend => (
            <Link to={`/profile/${friend.username}`} style={{textDecoration:'none'}}>
              <div className="rightbarFollowing">
                <img 
                  src={friend.profilePicture 
                        ? PF+friend.profilePicture 
                        : PF+'person/no-avatar.png'} 
                  alt="" 
                  className="rightbarFollowingImg" 
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default Rightbar