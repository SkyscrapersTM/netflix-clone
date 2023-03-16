import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import { auth } from './services/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './redux/state/userSlice'

function App() {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // Logged in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email
          })
        )
      } else {
        // Logged out
        dispatch(logout)
      }
    })
    return unsuscribe
  }, [])
  return (
    <div className='app'>
      <Router>
        {!user
          ? (<Login />)
          : (
            <Routes>
              <Route exact path='/' element={<Home />} />
            </Routes>
            )}
        </Router>
    </div>
  )
}

export default App
