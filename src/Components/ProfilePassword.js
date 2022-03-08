import React, { useState } from 'react'
import { useReducer } from 'react'
import nutritivApi from '../Api/nutritivApi'

const reducer = (prevState, action) => {
  switch(action.type) {
    case 'ADD_PASSWORD':
      return {
        ...prevState,
        passwordInput: {
          ...prevState.passwordInput,
          [action.payload.target.name]: action.payload.target.value
        }
      }
    default:
      throw new Error();
  }
}

export const ProfilePassword = () => {
  const [
    { 
      passwordInput,
    }, 
    dispatch
  ] = useReducer(reducer, {
    passwordInput: {
      oldPass: "",
      newPass: "",
      confirmNewPass: ""
    }
  })
  // const [passwordInput, setPasswordInput] = useState({
  //   oldPass: "",
  //   newPass: "",
  //   confirmNewPass: ""
  // })
  const [updatePasswordResponse, setUpdatePasswordResponse] = useState(null)
  const [loadingUpdatePassword, setLoadingUpdatePassword] = useState(false)
  
  const [errorPasswordInput, setErrorPasswordInput] = useState({
    isEmpty: false,
    isNotMatching: false,
  })

  console.log('# passwordInput :', passwordInput)
  console.log('# errorPasswordInput :', errorPasswordInput)
  console.log('# !passwordInput.oldPass :', !passwordInput.oldPass)
  
  const passwordInputsValidation = () => {
    setUpdatePasswordResponse(null)
    let passwordEmpty = false;
    let passwordNotMatching = false;
    
    if(
      !passwordInput.oldPass ||
      !passwordInput.newPass ||
      !passwordInput.confirmNewPass
    ) {
      console.log("IF ENTERED SUCCESSFULLY...")
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
  // const handlePasswordInputChange = (e) => {
  //   setPasswordInput({
  //     ...passwordInput,
  //     [e.target.name]: e.target.value
  //   })
  // }
  
  const handleSubmitUpdatePassword = async (e) => {
    e.preventDefault()
    
    const isValid = passwordInputsValidation();
    
    if(isValid) {
      console.log("INPUTS VALID, API CALL STARTING...")
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
        dispatch({
          type: "ADD_PASSWORD",
          payload: ""
        })
        // setPasswordInput({
        //   oldPass: "",
        //   newPass: "",
        //   confirmNewPass: ""
        // })
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
            onChange={event =>
              dispatch({ type: "ADD_PASSWORD", payload: event })
            }
            name='oldPass'
            placeholder='Current password...'
            type="password"
            value={passwordInput.oldPass}
          />
          <br />
          <input
            onChange={event =>
              dispatch({ type: "ADD_PASSWORD", payload: event.target.value})
            }
            name='newPass'
            placeholder='New password...'
            type="password"
            value={passwordInput.newPass}
          />
          <br />
          <input
            onChange={event =>
              dispatch({ type: "ADD_PASSWORD", payload: event.target.value})
            }
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
            errorPasswordInput.isNotMatching && (
              <span style={{color: "red"}}>
                The password do not match the confirmation field.
              </span>
            )
          }
          <br />
          { 
            errorPasswordInput.isEmpty && (
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
