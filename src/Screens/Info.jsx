import React from "react"
import styles from './Info.module.css'
import { FaLightbulb, FaBook, FaCogs } from "react-icons/fa"

const Info = () => {
  return (
    <div className={styles.Info}>
      <h1 className={styles.t1}>Aprendizaje Basado en Proyectos</h1>

      <p className={styles.sub1}>¿Qué es el aprendizaje basado en proyectos?</p>

      <p className={styles.textoin}>
        El Aprendizaje Basado en Proyectos (ABP) es una metodología educativa colaborativa que enfrenta a los estudiantes a situaciones reales, 
        donde deben plantear soluciones y generar productos, servicios o comprensiones capaces de resolver problemas o satisfacer necesidades. 
        Cada proyecto consiste en un conjunto de actividades interconectadas que toman en cuenta los recursos y el tiempo disponible, 
        promoviendo un aprendizaje activo y significativo.
      </p>

      <div className={styles.container}>
        {/* Objetivos */}
        <h2 className={styles.sectionTitle}>Objetivos representativos</h2>
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <FaLightbulb className={styles.icon} />
            <p>Formar estudiantes capaces de interpretar y comprender los fenómenos y acontecimientos a su alrededor.</p>
          </div>
          <div className={styles.card}>
            <FaBook className={styles.icon} />
            <p>Fomentar la motivación hacia la búsqueda y producción de conocimientos a través de experiencias de aprendizaje reales y complejas.</p>
          </div>
        </div>

        {/* Cómo implementar */}
        <h2 className={styles.sectionTitle}>¿Cómo implementar el ABP?</h2>
        <div className={styles.cardsContainer}>
          {/* Fase inicial */}
          <div className={styles.card}>
            <FaCogs className={styles.icon} />
            <h3>Fase inicial</h3>
            <ul>
              <li>Seleccionar un tema relevante y conectado con la realidad.</li>
              <li>Revisar contenidos del currículo para asegurar coherencia.</li>
              <li>Formar grupos colaborativos y asignar roles a cada estudiante.</li>
              <li>Establecer actividades con tiempos, espacios y recursos definidos.</li>
              <li>Definir la modalidad del proyecto y tipo de producto a desarrollar.</li>
              <li>Establecer objetivos claros y motivadores para los estudiantes.</li>
            </ul>
          </div>

          {/* Fase de desarrollo */}
          <div className={styles.card}>
            <FaCogs className={styles.icon} />
            <h3>Fase de desarrollo</h3>
            <ul>
              <li>Buscar y recopilar información relacionada con el tema.</li>
              <li>Analizar y sintetizar la información obtenida.</li>
              <li>Aplicar lo aprendido y producir el proyecto con creatividad y rigor.</li>
            </ul>
          </div>

          {/* Fase final */}
          <div className={styles.card}>
            <FaCogs className={styles.icon} />
            <h3>Fase final</h3>
            <ul>
              <li>Presentar formalmente el proyecto a la comunidad educativa.</li>
              <li>Evaluar el proyecto mediante rúbricas basadas en competencias.</li>
              <li>Reflexionar sobre aciertos, dificultades y aprendizajes durante el proceso.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info
