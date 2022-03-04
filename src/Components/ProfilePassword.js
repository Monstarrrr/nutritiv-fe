import React, { useState } from 'react'
import { apiUpdatePassword } from '../Api/nutritivApi'

export const ProfilePassword = () => {
  const [passwordInput, setPasswordInput] = useState({
    oldPass: "",
    newPass: "",
    confirmNewPass: ""
  })
  const [updatePasswordResponse, setUpdatePasswordResponse] = useState(null)
  const [loadingUpdatePassword, setLoadingUpdatePassword] = useState(false)
  
  const [errorUpdatePasswordEmpty, setErrorUpdatePasswordEmpty] = useState(false)
  const [errorUpdatePasswordNotMatching, setErrorUpdatePasswordNotMatching] = useState(false)
  
  const passwordInputsValidation = () => {
    setUpdatePasswordResponse(null)
    let passwordEmpty = false;
    let passwordNotMatching = false;
    if(
      !passwordInput.oldPass || 
      !passwordInput.newPass || 
      !passwordInput.confirmNewPass
    ) {
      setErrorUpdatePasswordEmpty(true)
      passwordEmpty = true;
    }
    if(passwordInput.newPass !== passwordInput.confirmNewPass) {
      setErrorUpdatePasswordNotMatching(true)
      passwordNotMatching = true;
    }
    return !passwordEmpty && !passwordNotMatching
  }
  
  // HANDLERS
  const handlePasswordInputChange = (e) => {
    setPasswordInput({
      ...passwordInput,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmitUpdatePassword = async (e) => {
    e.preventDefault()
    
    const isValid = passwordInputsValidation();
    
    if(isValid) {
      setLoadingUpdatePassword(true)
      setErrorUpdatePasswordNotMatching(false)
      setErrorUpdatePasswordEmpty(false)
        
      console.log('# sending passwordInput :', passwordInput)
      
      // API FUNCTION
      const data = await apiUpdatePassword(passwordInput)
      
      // IN ANY CASE
      setLoadingUpdatePassword(false)
      
      // IF ERROR
      if(data?.response?.status) {
        setUpdatePasswordResponse({})
        return;
      }
      
      // IF SUCCESS
      setUpdatePasswordResponse(data)
      setPasswordInput({
        oldPass: "",
        newPass: "",
        confirmNewPass: ""
      })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmitUpdatePassword}>
        <span>
          <h3>
            Password
          </h3>
          <br />
          <input
            onChange={handlePasswordInputChange}
            name='oldPass'
            placeholder='Current password...'
            type="password"
            value={passwordInput.oldPass}
          />
          <br />
          <input
            onChange={handlePasswordInputChange}
            name='newPass'
            placeholder='New password...'
            type="password"
            value={passwordInput.newPass}
          />
          <br />
          <input
            onChange={handlePasswordInputChange}
            name='confirmNewPass'
            placeholder='Confirm new password...'
            type="password"
            value={passwordInput.confirmNewPass}
          />
          <br />
          <input
            type="submit" 
            value="Change password"
          />
          <br />
          { 
            errorUpdatePasswordNotMatching && (
              <span style={{color: "red"}}>
                The password do not match the confirmation field.
              </span>
            )
          }
          <br />
          { 
            errorUpdatePasswordEmpty && (
              <span style={{color: "red"}}>
                Please fill in all the fields.
              </span>
            )
          }
          <br />
          {
            loadingUpdatePassword && (
              <span>
                Loading...
              </span>
            )
          }
          <br />
          {
            updatePasswordResponse && (
              updatePasswordResponse.success ? (
                <span style={{color: "green"}}>
                  Password successfully changed.
                </span>
              ) : (
                <span style={{color: "red"}}>
                  There was an error changing your password.
                </span>
              )
            )
          }
        </span>
      </form>
    </div>
  )
}
