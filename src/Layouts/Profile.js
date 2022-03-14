import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import nutritivApi from '../Api/nutritivApi';
import { ProfileAddress } from '../Components/ProfileAddress';
import { ProfileAvatar } from '../Components/ProfileAvatar';
import { ProfileEmail } from '../Components/ProfileEmail';
import { ProfilePassword } from '../Components/ProfilePassword';
import { ProfileUsername } from '../Components/ProfileUsername';

export default function Profile() {
  const user = useSelector(state => state.user)
  const [userInfo, setUserInfo] = useState({})
  
  // const [newUsername, setNewUsername] = useState(null)
  // const [newEmail, setNewEmail] = useState(null)
  
  useEffect(() => {
    setUserInfo(user)
  }, [user]);
  
  // HANDLERS
  // const handleChangeUsername = (e) => {
  //   setNewUsername(e.target.value)
  // }
  
  // const handleChangeEmail = (e) => {
  //   setNewEmail(e.target.value)
  // }
  
  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <ProfileAvatar 
        userInfo={userInfo} 
      />
      <br />
      <hr />
      <ProfileUsername 
        userInfo={userInfo} 
      />
      <br />
      <hr />
      <ProfileEmail 
        userInfo={userInfo} 
      />
      <br />
      <hr />
      <ProfilePassword />
      <br />
      <hr />
      <ProfileAddress userInfo={userInfo} />
      <br />
      <hr />
      {/* Is admin: {userInfo.isAdmin?.toString()} */}
      <br />
      {/* Is verified: {userInfo.isVerified?.toString()} */}
      <br />
    </div>
  )
}
