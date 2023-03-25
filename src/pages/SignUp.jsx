import { useRef } from 'react'
import { auth } from '../services/firebase'
import './SignUp.css'

const SignUp = () => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      await auth.createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
    } catch (error) {
      alert(`${error.message}\nComplete the form to create your credential.`)
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      await auth.signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className='signUp'>
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder='email' type='email' required />
        <input
          ref={passwordRef}
          placeholder='password'
          type='password'
          required
        />
        <button type='submit' onClick={handleSignIn}>
          Sign In
        </button>
        <h4>
          <span className='singUp__gray'>New to Netflix? </span>
          <span className='signUp__link' onClick={handleSignUp}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  )
}

export default SignUp
