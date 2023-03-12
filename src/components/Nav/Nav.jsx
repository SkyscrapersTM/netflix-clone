import { useEffect, useState } from 'react'
import './Nav.css'

const Nav = () => {
  const [show, setShow] = useState(false)

  const transitionNavbar = () => setShow(window.scrollY > 100)

  useEffect(() => {
    window.addEventListener('scroll', transitionNavbar)
    return () => window.removeEventListener('scroll', transitionNavbar)
  }, [])

  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <div className='nav__contents'>
        <img
          className='nav__logo'
          src='https://1000marcas.net/wp-content/uploads/2020/01/Logo-Netflix.png'
          alt='netflix logo'
        />
        <img
          className='nav__avatar'
          src='https://i.pinimg.com/originals/b6/77/cd/b677cd1cde292f261166533d6fe75872.png'
          alt='netflix avatar'
        />
      </div>
    </div>
  )
}

export default Nav
