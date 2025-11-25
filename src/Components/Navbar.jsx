import React, { useState, useEffect } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink, useLocation } from "react-router-dom"
import { TiThMenu } from 'react-icons/ti'
import { FaWindowClose } from 'react-icons/fa'
import styles from './Navbar.module.css'
import { useScrollPosition } from '../Hooks/scrollPosition'

const Navbar = () => {
  const [NavbarOpen, setNavbarOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const location = useLocation()
  const scrollPosition = useScrollPosition()

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    if (window.innerWidth > 800) setNavbarOpen(false)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const links = [
    { id: 1, link: 'Inicio', to: 'home' },
    { id: 2, link: 'Proyectos', to: 'projects' },
    { id: 3, link: 'Beneficios', to: 'beneficios' }, 
  ]

  return (
    <div
      className={
        NavbarOpen
          ? styles.NavOpen
          : scrollPosition > 0
            ? styles.NavOnScroll
            : styles.Navbar
      }
    >
      {!NavbarOpen && (
        <RouterLink
          to="/"
          className={styles.logo}
          onClick={() => setNavbarOpen(false)}
        >
          EDDI | Educación Digital
        </RouterLink>
      )}


      {windowWidth < 800 && (
        !NavbarOpen ? (
          <TiThMenu onClick={() => setNavbarOpen(true)} size={25} color='#213f61' />
        ) : (
          <FaWindowClose onClick={() => setNavbarOpen(false)} size={25} color="#213f61" />
        )
      )}

      {(NavbarOpen || windowWidth >= 800) && (
        <ul className={styles.linksContainer}>
          {links.map(({ id, link, to }) => (
            <li key={id}>
              {link === 'Beneficios' ? (
                <RouterLink
                  to="/beneficios"
                  className={styles.NavLink}
                  onClick={() => setNavbarOpen(false)}
                >
                  {link}
                </RouterLink>
              ) : location.pathname === '/' ? (
                <ScrollLink
                  to={to}
                  smooth={true}
                  duration={500}
                  className={styles.NavLink}
                  onClick={() => setNavbarOpen(false)}
                >
                  {link}
                </ScrollLink>
              ) : (
                <RouterLink
                  to={`/?scroll=${to}`}
                  className={styles.NavLink}
                  onClick={() => setNavbarOpen(false)}
                >
                  {link}
                </RouterLink>
              )}
              <div className={styles.border}></div>
            </li>
          ))}
          <li>
            <RouterLink
              to="/"
              className={`${styles.NavLink} ${styles.logoutButton}`}
              onClick={() => {
                localStorage.removeItem("matricula")
                setNavbarOpen(false)
              }}
            >
              Cerrar sesión
            </RouterLink>
            <div className={styles.border}></div>
          </li>

        </ul>
      )}
    </div>
  )
}

export default Navbar