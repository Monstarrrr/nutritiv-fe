import React, { useEffect, useReducer, useState } from 'react'
import { useSelector } from 'react-redux';
import nutritivApi from '../Api/nutritivApi';


export const Welcome = () => {
  const [formData, setFormData] = useState({})
  
  const loggedIn = useSelector(state => state.user.loggedIn)
  
  return (
    <div>
      <br />
      <h1>Homepage</h1>
      {
        !loggedIn && (
          <div>
            You are not connected
          </div>
        )
      }
    </div>
  )
}