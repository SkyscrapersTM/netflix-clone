import { useSelector } from 'react-redux'
import Nav from '../components/Nav/Nav'
import { auth } from '../services/firebase'
import Plans from './Plans'
import './Profile.css'

const Profile = () => {
  const user = useSelector((state) => state.user.user)

  return (
    <div className='profile'>
      <Nav />
      <div className='profile__body'>
        <h1>Edit Profile</h1>
        <div className='profile__info'>
          <img
            src='https://i.pinimg.com/originals/b6/77/cd/b677cd1cde292f261166533d6fe75872.png'
            alt='netflix avatar'
          />
          <div className='profile__details'>
            <h2>{user.email}</h2>
            <div className='profile__plans'>
              <h3>Plans</h3>
              <Plans />
              <button
                onClick={() => {
                  auth.signOut()
                }}
                className='profile__signOut'
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
