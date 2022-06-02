import React, { useState } from 'react'
import nutritivApi from '../../Api/nutritivApi';

export const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  
  
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await nutritivApi.post(
        `/auth/forget_pwd`,
        { email }
      )
      console.log('# get /auth/login :', data)
    } catch(err) {
      console.error('/auth/login:', err)
    }
  }
  
  const handleChange = (e) => {
    setEmail(e.target.value)  
  }

  console.log('# email :', email)
  
  return (
    <>
      <form onSubmit={handleForgotPassword}>
        <p>Enter your email:</p>
        <input
          name="emailForgotPassword" 
          onChange={handleChange}
          placeholder='Email...' 
          type="text" 
          value={email}
        />
        <input value="Set new password" type="submit"/>
      </form>
    </>
  )
}