import React from "react"
import styles from './Beneficios.module.css'
import { FaTrophy } from "react-icons/fa"

const Beneficios = () => {
    return (
        <div className={styles.container}>
            <div className={styles.Beneficios}>
                <h1>Beneficios del Aprendizaje Basado en Proyectos</h1>
                <p>
                    El Aprendizaje Basado en Proyectos (ABPy) ofrece múltiples beneficios que fortalecen los procesos de enseñanza-aprendizaje, tales como:
                </p>
            </div>

            <div className={styles.card}>
                <FaTrophy className={styles.icon} />
                <p>Favorece la integración de asignaturas, promoviendo una visión global de los conocimientos.</p>
            </div>

            <div className={styles.card}>
                <FaTrophy className={styles.icon} />
                <p>Permite organizar actividades en torno a objetivos compartidos, alineados con los intereses y compromiso de los estudiantes.</p>
            </div>

            <div className={styles.card}>
                <FaTrophy className={styles.icon} />
                <p>Estimula la creatividad, responsabilidad, trabajo colaborativo, pensamiento crítico y la capacidad de tomar decisiones.</p>
            </div>

            <div className={styles.card}>
                <FaTrophy className={styles.icon} />
                <p>Facilita que los estudiantes experimenten formas de interacción y colaboración exigidas en el mundo actual.</p>
            </div>

            <div className={styles.card}>
                <FaTrophy className={styles.icon} />
                <p>Combina la adquisición de contenidos fundamentales con el desarrollo de habilidades que fomentan la autonomía en el aprendizaje.</p>
            </div>

            <div className={styles.card}>
                <FaTrophy className={styles.icon} />
                <p>Contribuye al desarrollo personal, fomentando la experiencia de trabajar en equipo durante el proyecto.</p>
            </div>

            <div className={styles.card}>
                <FaTrophy className={styles.icon} />
                <p>Desarrolla habilidades sociales, planificación, monitoreo y resolución de problemas dentro del trabajo colaborativo.</p>
            </div>

            <div className={styles.card}>
                <FaTrophy className={styles.icon} />
                <p>Permite satisfacer necesidades sociales, reforzando valores y el compromiso del estudiante con su entorno.</p>
            </div>

        </div>
    )
}

export default Beneficios
