import React, { useState } from 'react'
import './Login.css'
import SignUp from './SignUp'

const Login = () => {
  const [signIn, setSignIn] = useState(false)
  return (
    <div className='login'>
      <div className='login__background'>
        <img
          className='login__logo'
          src='https://1000marcas.net/wp-content/uploads/2020/01/Logo-Netflix.png'
          alt='netflix banner'
        />
        <button
          className='login__button'
          onClick={() => {
            setSignIn(true)
          }}
        >
          Sign In
        </button>
        <div className='login__gradient'></div>
      </div>
      <div className='login__body'>
        {signIn
          ? (<SignUp />)
          : (
            <>
                <h1>Unlimited films, TV programmes and more.</h1>
                <h2>Watch anywhere. Cancel at any time.</h2>
                <h3>
                Ready to watch? Enter your email to create or restart your
                membership.
                </h3>
                <div className='login__form'>
                <form>
                    <input type='email' placeholder='Email Address' />
                    <button
                    className='login__getStarted'
                    onClick={() => {
                      setSignIn(true)
                    }}
                    >
                    GET STARTED
                    </button>
                </form>
                </div>
            </>
            )}
      </div>
    </div>
  )
}

export default Login
