import React, { useState } from 'react';
import nutritivApi from '../Api/nutritivApi';

export default function RegisterPage() {
  
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    loading: false,
    error: "",
    success: "",
  });
  const [test, setTest] = useState("")
  
  const handleChange = (e) => {
    setRegisterData({
      ...registerData, 
      [e.target.name]: e.target.value 
    })
  }
  
  const validation = () => {
    setRegisterData({ ...registerData, error: "" })
    if(
      !registerData.username || 
      !registerData.email || 
      !registerData.password
    ) {
      setRegisterData({
        ...registerData,
        error: "Please fill in all the fields."
      })
      return false
    }
    return true
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isValid = validation();
    
    if(isValid) {
      setRegisterData({...registerData, loading: true})
      try {
        await nutritivApi.post(
          '/auth/register',
          registerData
        )
        setRegisterData({
          ...registerData,
          success: "Your account has been successfully created."
        })
      } catch({ response }) {
        setRegisterData({
          ...registerData,
          loading: false,
          error: response.data.err
        })
      }
    }
  }
    
  return (
    <div>
      <h2>Register page</h2>
      <form onSubmit={ handleSubmit }>
        <label>
          <p>Username</p>
          <input 
            name="username" 
            onChange={ handleChange } 
            type="text" 
          />
        </label>
        <label>
          <p>Email</p>
          <input 
            name="email" 
            onChange={ handleChange } 
            type="text" 
          />
        </label>
        <label>
          <p>Password</p>
          <input 
            name="password" 
            onChange={ handleChange } 
            type="password"
          />
        </label>
        {
          registerData.loading && (
            <p style={{color: "red"}}>
              <span role="img" aria-label="loading">
                🕓
              </span>
            </p>
          )
        }
        {
          registerData.error && (
            <p style={{color: "red"}}>
              {registerData.error}
            </p>
          )
        }
        {
          registerData.success && (
            <p style={{color: "green"}}>
              {registerData.success}
            </p>
          )
        }
        <div>
          <button type="submit">Submit</button>
        </div>
        <pre>
          {JSON.stringify(test.response, null, 2)}
        </pre>
      </form>
    </div>
  )
}