import React from 'react'
import { useDispatch } from 'react-redux'
import nutritivApi from '../Api/nutritivApi'
import { logoutUser } from '../Redux/reducers/user';

export const Logout = () => {
  const dispatch = useDispatch();
  
  const handleLogout = async () => {
    try {
      await nutritivApi.delete(
        `/auth/logout`,
      )
      dispatch(logoutUser())
    } catch(err) {
      console.error(':', err)
    }
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  )
}