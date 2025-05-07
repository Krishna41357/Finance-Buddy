import { useState } from 'react'
import reactLogo from './assets/react.svg'
import SignupForm from './components/auth/signup/SignupForm'
import LoginPage from './components/auth/login/loginPage'
import './App.css'
import axios from 'axios'


function App() {


  return (
    <>
    {/* <LoginPage />  */}
   <SignupForm /> 
    </>
  )
}

export default App
