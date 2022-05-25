import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import nutritivApi from '../../Api/nutritivApi'
import { updateUser } from '../../Redux/reducers/user'

const initialInputTFA = {
  code: "",
  password: ""
}

export const ProfileTFA = ({ userInfo }) => {
  const dispatch = useDispatch();
  const [TFAStatus, setTFAStatus] = useState("disabled")
  const [qrCode, setQrCode] = useState(null)
  const [inputTFA, setInputTFA] = useState(initialInputTFA)
  
  // Check 2FA status
  useEffect(() => {
    setTFAStatus(userInfo.has2FA ? "enabled" : "disabled")
  }, [userInfo.has2FA]);
  
  // Request qrCode
  const handleEnableTFA = async (e) => {
    e.preventDefault();
    try {
      const { data } = await nutritivApi.post(
        `/auth/totpSecret`,
      )
      setQrCode(data)
      console.log('# post /auth/totpSecret :', data)
    } catch(err) {
      console.error('/auth/totpSecret:', err)
    }
  }
  
  // Enable 2FA
  const handleSubmitEnableTFA = async (e) => {
    e.preventDefault();
    const newTwoFaToken = localStorage.getItem('new_twofa_token')
    try {
      await nutritivApi.post(
        `/auth/enable2FA`,
        {
          token: inputTFA.code,
          password: inputTFA.password,
        },
        {
          headers: {
            new_twofa_token: newTwoFaToken
          }
        }
      )
      setInputTFA(initialInputTFA)
      setTFAStatus("enabled")
    } catch(err) {
      console.error(':', err)
    }
  }
  
  // Disable 2FA
  const handleDisableTFA = async (e) => {
    e.preventDefault();
    try {
      const { data } = await nutritivApi.post(
        `/auth/disable2FA`,
        {
          token: inputTFA.code,
          password: inputTFA.password,
        },
      )
      dispatch(
        updateUser({hasTFA: false})
      )
      setInputTFA(initialInputTFA)
      console.log('# post /auth/disable2FA :', data)
    } catch(err) {
      console.error('/auth/disable2FA:', err)
    }
  }
  
  const handleChange = (e) => {
    setInputTFA({
      ...inputTFA,
      [e.target.name]: e.target.value
    })
  }

  console.log('# QRcode :', qrCode)

  return (
    <div>
      <h3>
        2 Factor Authentication (2FA)
      </h3>
      { 
        TFAStatus === "enabled" ? (
          <>
            <p style={{color: "green"}}>
              2FA is enabled.
            </p>
            <form onSubmit={handleDisableTFA}>
              <input
                name="code" 
                onChange={handleChange}
                value={inputTFA.code}
                placeholder='2FA Code' 
                type="text"
              />
              <input 
                name="password" 
                onChange={handleChange}
                value={inputTFA.password}
                placeholder='Current password' 
                type="password" 
              />
              <input 
                value="Disable" 
                type="submit" 
              />
            </form>
          </>
        ) : (
          qrCode ? (
            <>
              <img 
                src={qrCode}
                alt="QR code"
              />
              <p>
                Scan the QRCode with 2FA Google Authenticator and enter the code below:
              </p>
              <form onSubmit={handleSubmitEnableTFA}>
                <input
                  name="code" 
                  onChange={handleChange}
                  value={inputTFA.code}
                  placeholder='2FA Code' 
                  type="text"
                />
                <input 
                  name="password" 
                  onChange={handleChange}
                  value={inputTFA.password}
                  placeholder='Current password' 
                  type="password" 
                />
                <input 
                  value="Enable 2FA !" 
                  type="submit" 
                />
              </form>
            </>
          ) : (
            <>
              <p style={{color: "orange"}}>
                2FA is disabled.
              </p>
              <button onClick={handleEnableTFA}>
                Enable
              </button>
            </>
          )
        )
      }
    </div>
  )
}