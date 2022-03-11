import React from 'react';
import { useSelector } from 'react-redux';
import nutritivApi from '../Api/nutritivApi';

export default function HomePage() {
  console.log("##### HomePage render #####");
  
  const loggedIn = useSelector(state => state.user.loggedIn)
  
  const handleSpam = async () => {
    for(let i=0; i<60; i = i+1){
      try {
        const { data } = await nutritivApi.get(
          `/users/self`,
        )
        console.log('# data :', data)
      } catch(err) {
        console.error('/users/selfAvatar:', err)
      }
    }
  }

  return (
    <div>
      <h1>Homepage</h1>
      {
        !loggedIn && (
          <div>
            You are not connected
          </div>
        )
      }
      <button onClick={handleSpam}>
        Spam :)
      </button>
    </div>
  );
}