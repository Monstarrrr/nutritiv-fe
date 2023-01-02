/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useNavigate } from 'react-router-dom';
import nutritivApi from '../../Api/nutritivApi';
import { tokens } from '../../Helpers/styleTokens';
import { AuthButton, AuthPageContainer, AuthSubtitle, AuthTextInput, AuthTitle } from './Login';
import { OAuth } from './OAuth';

const ThirdPartyContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 250px;
`
const Form = styled.form`
  width: 250px;
`
const FormLabel = styled.label``

const RegisterPage = forwardRef((props, ref) => {
  const navigate = useNavigate();
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
      <Form
        onSubmit={ handleSubmit }
      >
        <FormLabel>
          <AuthSubtitle>Username</AuthSubtitle>
          <AuthTextInput 
            name="username" 
            onChange={ handleChange } 
            placeholder="Username..."
            type="text" 
          />
        </FormLabel>
        <FormLabel>
          <AuthSubtitle>Email</AuthSubtitle>
          <AuthTextInput 
            name="email" 
            onChange={ handleChange }
            placeholder="Email..." 
            type="text" 
          />
        </FormLabel>
        <FormLabel>
          <AuthSubtitle>Password</AuthSubtitle>
          <AuthTextInput 
            name="password" 
            onChange={ handleChange }
            placeholder="Password..." 
            type="password"
          />
        </FormLabel>
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
      </Form>
      <br />
      <span
        css={css`
          margin-bottom: ${tokens.spacing.xl};
        `}
      >
        or
      </span>
      <ThirdPartyContainer>
        <OAuth provider="google"/>
        <OAuth provider="facebook"/>
        <OAuth provider="github"/>
      </ThirdPartyContainer>
      <div css={css`
        display: flex; 
        margin-top: ${tokens.spacing.md};
        justify-content: space-between;
        width: 250px;
      `}>
        <span css={css`display: inline-block;`}>
          Already have an account ?
        </span>
        <button
          css={css`
            background: none;
            border: none;
            color: ${tokens.color.accentStrong};
            cursor: pointer;
            display: inline-block;
            transition: all ease .2s;
            &:hover {
              opacity: 0.8;
              transition: all ease .2s;
            }
          `}
          onClick={() => navigate('/register')}
        >
          Login
        </button>
      </div>
    </AuthPageContainer>
  )
})

export default RegisterPage;