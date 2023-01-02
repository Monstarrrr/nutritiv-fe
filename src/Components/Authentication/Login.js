/* eslint-disable no-unused-vars */
/** @jsxImportSource @emotion/react */
import axios from 'axios';
import React, { 
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import nutritivApi from '../../Api/nutritivApi';
import { updateUser, updateUserCartQuantity } from '../../Redux/reducers/user';
import { OAuth } from './OAuth';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import styled from '@emotion/styled';
import { mediaQuery, tokens } from '../../Helpers/styleTokens';
import { NutriButton } from '../NutriButton';
import { css } from '@emotion/react';
import { HoverableLinks } from '../PagesWrapper';

export const AuthTitle = styled.h1`
  text-transform: uppercase;
`

export const AuthPageContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  margin-top: -150px;
  position: absolute;
  width: 100%;
`

export const AuthTextInput = styled.input`
  background: ${tokens.color.accentTransparent};
  border: none;
  border-radius: ${tokens.borderRadius.sm};
  box-sizing: border-box;
  color: ${tokens.color.contrastLight};
  font-size: ${tokens.font.fontSize.sm};
  padding: ${tokens.spacing.xs} ${tokens.spacing.md};
  outline: none;
  width: 100%;
  &:focus {
    outline: 1px solid ${tokens.color.accentStrong};
  }
`

export const AuthSubtitle = styled.p`
  font-size: ${tokens.font.fontSize.md};
  margin-bottom: ${tokens.spacing.sm};
`

export const AuthButtonStyle = css`
  background: ${tokens.color.accentStrong};
  border-radius: ${tokens.borderRadius.sm};
  border: none;
  color: ${tokens.color.contrastDark};
  cursor: pointer;
  font-size: ${tokens.font.fontSize.sm};
  font-weight: ${tokens.font.fontWeight.medium};
  outline: none;
  margin: ${tokens.spacing.xl} 0;
  padding: ${tokens.spacing.sm} ${tokens.spacing.xl};
  transition: all .2s ease;
  &:hover {
    box-shadow: 0 0 6px ${tokens.color.accentStrong};
    transition: all .2s ease;
  }
  ${mediaQuery[1]} {
    padding: calc(${tokens.spacing.xl} / 2) ${tokens.spacing.xxl};
  }
`
export const AuthButton = styled.button`
  ${AuthButtonStyle}
  width: 100%;
` 
export const AuthSubmit = styled.input`
  ${AuthButtonStyle}
`
export const CleanButton = styled.span`
  color: ${tokens.color.accentStrong};
  cursor: pointer;
  display: block;
  font-size: ${tokens.font.fontSize.xs};
  margin: ${tokens.spacing.sm} 0;
  text-decoration: none;
  transition: all ease .2s;
  &:hover {
    transition: all ease .2s;
    opacity: 0.65;
  }
`

const LoginPage = forwardRef((props, ref) => {
  
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  const [login, setLogin] = useState({
    username: "",
    password: "",
    emailForgotPassword: "",
    twoFaCode: "",
    loading: false,
    success: "",
    error: "",
  })
  const loginData = useRef(null);
  const [hasTFA, setHasTFA] = useState(false)
  
  // onEveryRender
  useEffect(() => {
    loginData.current = {
      username: login.username,
      password: login.password,
    }  
  });
  
  // Auto-set login credentials
  useEffect(() => {
    if(location.state?.username) {
      setLogin(prevState => ({
        ...prevState, 
        username: location.state.username
      }))
    }
  }, [location]);
  
  // Form validation
  const validation = () => {
    let usernameError = !login.username
    let passwordError = !login.password
    
    setLogin({...login,
      usernameError,
      passwordError,
      error: ""
    })
    
    return !usernameError && !passwordError
  }

  // GET USER INFO
  const getUserInfo = () => {
    function useNull() {
      return null;
    }
    let fetchApi = async () => {
      const method = "get"
      const requestsUrl = ['/users/self', '/carts/self']
      const requests = requestsUrl.map(url => {
        return { url, method }
      })
      
      await Promise.all([
        nutritivApi.request(requests[0]).catch(useNull),
        nutritivApi.request(requests[1]).catch(useNull),
      ]).then(function([userSelf, cartSelf]) {
        if(cartSelf.data.cart){
          dispatch(
            updateUserCartQuantity(cartSelf.data.cart.totalQuantity)
          )
        }
        dispatch(
          updateUser(userSelf.data)
        )
      }).catch(function([userSelf, cartSelf]) {
        console.log('# userSelf err :', userSelf)
        console.log('# cartSelf err :', cartSelf)
      })
    }
    fetchApi();
  }
  
  const handleChange = (e) => {
    setLogin({...login,
      [e.target.name]: e.target.value,
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // reCAPTCHA
    if(!executeRecaptcha) {
      setLogin({
        ...login,
        error: "reCaptcha couldn't be loaded, please try again or contact the support."
      })
      return;
    }
    const reCaptchaToken = await executeRecaptcha();
    
    // We store and use the return value 
    // because the state won't update yet
    const isValid = validation();
    
    if(isValid) {
      // LOGIN
      try {
        setLogin({...login,
          loading: true,
          error: "",
        })
        
        const req = {
          ...loginData.current,
          captcha: reCaptchaToken
        }
        const { data } = await nutritivApi.post(
          `/auth/login`,
          req
        )
        setLogin({...login,
          loading: false,
          error: "",
        })

        // ASK FOR 2FA or REDIRECT
        data.hasTFA ? (
          setHasTFA(data.hasTFA)
        ) : (
          getUserInfo()
        )

      } catch (err) {
        console.log('# loginData err :', err)
        setLogin({...login,
          loading: false,
          error: err.response?.data?.info?.message
        })
      }
    }
  }
  
  // SUBMIT 2FA CODE
  const handleSubmitTwoFa = async (e) => {
    e.preventDefault();
    const twoFaToken = localStorage.getItem('twofa_token')
    
    try {
      setLogin({...login,
        loading: true,
        error: "",
      })
      await nutritivApi.post(
        `/auth/TFAValidation`,
        {
          code: login.twoFaCode
        },
        {
          headers: {
            twofa_token: twoFaToken
          }
        }
      )
      setLogin({...login,
        loading: false,
        success: "Login successful!",
        error: "",
      })
      getUserInfo();
    } catch(err) {
      err.response?.data?.err ? (
        setLogin({
          ...login,
          loading: false,
          error: err.response.data.err
        })
      ) : (
        setLogin({
          ...login,
          loading: false,
          error: "There was an error on our end, please try again in 1 minute."
        })
      )
    }
  }
  
  return (
    <AuthPageContainer>
      <AuthTitle>Login</AuthTitle>
      {
        location.state?.msg && (
          <p 
            style={{
              color: location.state?.status === "success" ? "green" : "orange"
            }}
          >
            {location.state.msg}
          </p>
        )
      }
      {hasTFA ? (
        <>
          <AuthSubtitle>2FA code</AuthSubtitle>
          <form onSubmit={ handleSubmitTwoFa }>
            <AuthTextInput 
              name="twoFaCode"
              onChange={ handleChange }
              type="text" 
            />
            <input value="Submit" type="submit" />
          </form>
          <button onClick={() => navigate('/forgot-2FA')}>
            Forgot 2FA
          </button>
        </>
      ) : (
        <>
          <form onSubmit={ handleSubmit }>
            <label>
              <AuthSubtitle>Username</AuthSubtitle>
              <AuthTextInput 
                name="username" 
                onChange={ handleChange } 
                placeholder="Username..."
                type="text" 
                value={login.username}
              />
              {
                login.usernameError && (
                  <p style={{color: "red"}}>
                    Please enter your username
                  </p>
                )
              }
            </label>
            <label>
              <AuthSubtitle>Password</AuthSubtitle>
              <AuthTextInput 
                name="password" 
                onChange={ handleChange }
                placeholder="Password..." 
                type="password"
                value={login.password}
              />
              {
                login.passwordError && (
                  <p style={{color: "red"}}>
                    Please enter your password
                  </p>
                )
              }
            </label>
            <CleanButton onClick={() => navigate('/forgot-password')}>
              Forgot password
            </CleanButton>
            <div css={css`
              display: flex;
              > input {
                width: 100%;
              }
            `}>
              <AuthSubmit
                value="Login"
                type="submit" 
              />
              <div id="recaptcha"/>
            </div>
          </form>
          <span
            css={css`
              margin-bottom: ${tokens.spacing.xl};
            `}
          >
            or
          </span>
          <button
            css={css`
              background: none;
              border: none;
              color: ${tokens.color.accentStrong};
              cursor: pointer;
              transition: all ease .2s;
              &:hover {
                opacity: 0.8;
                transition: all ease .2s;
              }
            `}
            onClick={() => navigate('/register')}
          >
            Create an account
          </button>
        </>
      )}
      {
        login.loading && (
          <p>
            Loading...
          </p>
        )
      }
      {
        login.error && (
          <p style={{color: "red"}}>
            {login.error}
          </p>
        )
      }
      {
        login.success && (
          <p style={{color: "green"}}>
            {login.success}
          </p>
        )
      }
    </AuthPageContainer>
  )
})

export default LoginPage;