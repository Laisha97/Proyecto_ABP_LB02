import React, { useState, useEffect } from 'react'
import styles from './Home.module.css'
import { FaLightbulb, FaBook, FaCogs } from "react-icons/fa"
import books from '../assets/books.png'
import casa from '../assets/casa.png'
import semaforo from '../assets/semaforo.png'
import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink } from "react-router-dom"



const Home = () => {

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, []);

  return (

    <div className={styles.Home}>

      {/* Primera sección después del navbar */}
      <div className={styles.section1}>

        <div className={styles.abpSection}>
          <div className={styles.abpText}>
            <div className={styles.textoContainer}>
              <p className={styles['texto-abp']}>
                <span className={styles.mini}>Educación digital</span>
                <br></br>
                <span className={styles.resaltado}>Aprendizaje Basado en Proyectos (ABP)</span> <br></br>
                <br></br>
                <span className={styles.Es}>Es una metodología educativa donde los estudiantes</span>
                <span className={styles.activo}> aprenden de manera activa</span> al planear, desarrollar y evaluar proyectos con aplicación en la vida real.
                <br /><br />
                Con este enfoque, los alumnos se convierten en
                <span className={styles.protagonista}> protagonistas de su propio aprendizaje.</span>
              </p>

              <RouterLink to="/Info" className={styles.info}>
                Ver más información
              </RouterLink>
            </div>
          </div>

          {/* Imagen */}
          <div className={styles.abpbooks}>
            <img src={books} alt="ABP representativo" />
          </div>
        </div>
      </div>

      {/* Sección de frase en movimiento */}
      <div className={styles.sectionQuote}>
        <p className={styles.quoteText}>
          Aprende haciendo, crea tu futuro
        </p>
      </div>

      {/* Segunda sección */}
      <div id="projects" className={styles.section2}>
        <div className={styles.textSide}>
          <h2 className={styles.segtitle}>Explora los proyectos</h2>
          <p className={styles.projectsDescription}>
            Estos proyectos te permitirán aplicar el Aprendizaje Basado en Proyectos (ABP) y desarrollar habilidades prácticas mientras trabajas en retos reales.
          </p>
        </div>

        <div className={styles.projectsContainer}>

          {/* Proyecto 1 */}
          <div className={styles.projectCard}>
            <div className={styles.projectImageContainer}>
              <img src={casa} alt="Proyecto Casa" className={styles.projectImage} />
            </div>
            <div className={styles.projectTextContainer}>
              <p className={styles.projectName}>Distribución del internet en casa</p>
              <RouterLink to="/proyecto1" className={styles.projectButton}>
                Ir al reto
              </RouterLink>
            </div>
          </div>

          {/* Proyecto 2 */}
          <div className={styles.projectCard}>
            <div className={styles.projectImageContainer}>
              <img src={semaforo} alt="Proyecto Semáforo" className={styles.projectImage} />
            </div>
            <div className={styles.projectTextContainer}>
              <p className={styles.projectName}>Distribución de semáforos</p>
              <RouterLink to="/proyecto2" className={styles.projectButton}>
                Ir al reto
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <p className={styles.nombre}>LVBE</p>
    </div>
  )
}

export default Home