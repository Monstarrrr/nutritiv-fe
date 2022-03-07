import React, { useEffect, useState } from 'react';
import { apiGetUserSelf } from '../Api/nutritivApi';
import { ProfileAddress } from '../Components/ProfileAddress';
import { ProfileEmail } from '../Components/ProfileEmail';
import { ProfilePassword } from '../Components/ProfilePassword';
import { ProfileUsername } from '../Components/ProfileUsername';

export default function Profile() {
  const [userInfo, setUserInfo] = useState({})
  
  // const [newUsername, setNewUsername] = useState(null)
  // const [newEmail, setNewEmail] = useState(null)
  
  // EFFECTS
  useEffect(() => {
    async function fetchApi() {
      try {
        const data = await apiGetUserSelf()
        setUserInfo(data)
      } catch(err) {
        console.log('apiGetUserSelf() err :', err)
      }
    }
    fetchApi();
  }, []);
  
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
      <ProfileUsername userInfo={userInfo} />
      <hr />
      <br />
      <ProfileEmail userInfo={userInfo} />
      <hr />
      <br />
      <ProfilePassword />
      <hr />
      <br />
      <ProfileAddress />
      <hr />
      <br />
      Is admin: {userInfo.isAdmin?.toString()}
      <br />
      Is verified: {userInfo.isVerified?.toString()}
      <br />
    </div>
  )
}
