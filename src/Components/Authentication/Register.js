/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { forwardRef, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useNavigate } from 'react-router-dom';
import nutritivApi from '../../Api/nutritivApi';
import { tokens } from '../../Helpers/styleTokens';
import { AuthButton, AuthInput, AuthPageContainer, AuthSubtitle, AuthTextInput, AuthTitle } from './Login';
import { OAuth } from './OAuth';

const RegisterPage = forwardRef((props, ref) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [registerStatus, setRegisterStatus] = useState({
    loading: false,
    error: "",
    success: "",
  })
  
  const handleChange = (e) => {
    setRegisterData({
      ...registerData, 
      [e.target.name]: e.target.value 
    })
  }
  
  const validation = () => {
    if(
      !registerData.username || 
      !registerData.email || 
      !registerData.password
    ) {
      setRegisterStatus({
        loading: false,
        error: "Please fill in all the fields."
      })
      return false
    }
    return true
  }
  
  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterStatus({
      loading: true,
      error: "",
      success: ""
    })

    const isValid = validation();
    
    // reCAPTCHA
    if(!executeRecaptcha) {
      setRegisterData({
        loading: false,
        error: "reCaptcha couldn't be loaded, please try again or contact the support."
      })
      return;
    }
    let reCaptchaToken;
    try {
      reCaptchaToken = await executeRecaptcha();
    } catch(err) {
      setRegisterStatus({
        loading: false,
        error: "There was an internal error with recaptcha."
      })
      console.error('# error in executeRecaptcha() :', err)
    }
    
    if(isValid) {
      try {
        let req = {
          ...registerData,
          captcha: reCaptchaToken
        } 
        await nutritivApi.post(
          '/auth/register',
          req
        )
        setRegisterStatus({
          loading: false,
          error: "",
          success: "Your account has been successfully created, check your email."
        })
        // navigate(
        //   '/login',
        //   { state:
        //     {
        //       msg: "Account created, check your emails .",
        //       success: true,
        //       from: `/chat`
        //     }
        //   }
        // )
      } catch({ response }) {
        console.log('# /auth/register error :', response)
        setRegisterStatus({
          loading: false,
          error: response.data.err
        })
      }
    }
  }
    
  return (
    <AuthPageContainer>
      <AuthTitle>Create Account</AuthTitle>
      <form onSubmit={ handleSubmit }>
        <label>
          <AuthSubtitle>Username</AuthSubtitle>
          <AuthTextInput 
            name="username" 
            onChange={ handleChange } 
            placeholder="Username..."
            type="text" 
          />
        </label>
        <label>
          <AuthSubtitle>Email</AuthSubtitle>
          <AuthTextInput 
            name="email" 
            onChange={ handleChange }
            placeholder="Email..." 
            type="text" 
          />
        </label>
        <label>
          <AuthSubtitle>Password</AuthSubtitle>
          <AuthTextInput 
            name="password" 
            onChange={ handleChange }
            placeholder="Password..." 
            type="password"
          />
        </label>
        {
          registerStatus.loading && (
            <p>
              Creating account...
            </p>
          )
        }
        {
          registerStatus.error && (
            <p style={{color: "red"}}>
              {registerStatus.error}
            </p>
          )
        }
        {
          registerStatus.success && (
            <p style={{color: "green"}}>
              {registerStatus.success}
            </p>
          )
        }
        <div
          css={css`
            margin-top: ${tokens.spacing.md};
          `}
        >
          <AuthButton
            type="submit"  
          >
            Submit
          </AuthButton>
        </div>
      </form>
      <br />
      <span
        css={css`
          margin-bottom: ${tokens.spacing.xl};
        `}
      >
        or
      </span>
      <br />
      <br />
      <OAuth provider="google"/>
      <br />
      <OAuth provider="facebook"/>
      <br />
      <OAuth provider="github"/>
    </AuthPageContainer>
  )
})

export default RegisterPage;