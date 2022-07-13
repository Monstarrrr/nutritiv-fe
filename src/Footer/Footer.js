import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer style={{marginTop: "20px"}}>
      This site is protected by reCAPTCHA and the Google&nbsp;
      <a href="https://policies.google.com/privacy">Privacy Policy</a> and&nbsp;
      <a href="https://policies.google.com/terms">Terms of Service</a> apply.&nbsp;
      <Link to="/releases">
        Release
      </Link>
      .
    </footer>
  )
}