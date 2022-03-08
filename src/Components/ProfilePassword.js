import React, { useState } from 'react'
import nutritivApi, { apiUpdatePassword } from '../Api/nutritivApi'

export const ProfilePassword = () => {
  const [passwordInput, setPasswordInput] = useState({
    oldPass: "",
    newPass: "",
    confirmNewPass: ""
  })
  const [updatePasswordResponse, setUpdatePasswordResponse] = useState(null)
  const [loadingUpdatePassword, setLoadingUpdatePassword] = useState(false)
  
  const [errorPasswordInput, setErrorPasswordInput] = useState({
    isEmpty: false,
    isNotMatching: false,
  })
  
  const passwordInputsValidation = () => {
    setUpdatePasswordResponse(null)
    let passwordEmpty = false;
    let passwordNotMatching = false;
    if(
      !passwordInput.oldPass ||
      !passwordInput.newPass ||
      !passwordInput.confirmNewPass
    ) {
      setErrorPasswordInput({
        ...errorPasswordInput,
        isEmpty: true,
      })
      passwordEmpty = true;
    } else {
      setErrorPasswordInput({
        ...errorPasswordInput,
        isEmpty: false,
      })
    }
    if(passwordInput.newPass !== passwordInput.confirmNewPass) {
      setErrorPasswordInput({
        ...errorPasswordInput,
        isNotMatching: true,
      })
      passwordNotMatching = true;
    } else {
      setErrorPasswordInput({
        ...errorPasswordInput,
        isNotMatching: false,
      })
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
      setErrorPasswordInput(
        Object.keys(errorPasswordInput).forEach(v => (
          errorPasswordInput[v] = false
        ))
      )
      
      try {
        const { data } = await nutritivApi.put(
          `/users/reset_password`,
          passwordInput
        )
        setUpdatePasswordResponse(data)
        setPasswordInput({
          oldPass: "",
          newPass: "",
          confirmNewPass: ""
        })
      } catch (err) {
        setUpdatePasswordResponse({})
        console.log('# /users/reset_password :', err)
      }
      setLoadingUpdatePassword(false)
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
