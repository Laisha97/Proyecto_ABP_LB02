import React, { useState, useEffect } from "react"
import { FaTrafficLight, FaCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import Confetti from "react-confetti"
import { motion } from "framer-motion"
import styles from "./Proyecto2.module.css"
import { Link } from "react-router-dom"
import FAS from "../Components/FAS"
import { useRef } from "react"
import { sendData } from "../utils/sendData"
import { useLocation } from "react-router-dom"

// Problema nivel 1
const problemasNivel1 = [
  {
    enunciado: (
      <div>
        <p>En un cruce, el semáforo principal tiene un ciclo de 60 segundos:</p>
        <ul>
          <li>Verde: 30 s</li>
          <li>Amarillo: 5 s</li>
          <li>Rojo: 25 s</li>
        </ul>
        <p>Debes diseñar un <span>semáforo secundario</span> que permita el paso de autos cuando el principal esté en rojo.</p>
        <p>Condiciones:</p>
        <ul>
          <li>El semáforo secundario debe durar 10 segundos menos en verde que el rojo del semáforo principal.</li>
          <li>El tiempo en amarillo del semáforo secundario será 5 segundos.</li>
          <li>El ciclo total del semáforo secundario debe ser de 60 segundos.</li>
        </ul>
        <p>¿Cuánto tiempo debe durar el semáforo secundario en verde, amarillo y rojo?</p>
      </div>
    ),
    validacion: ({ x2, y2, z2 }) => {
      const z1 = 25; // rojo principal
      const eq1 = Math.abs(x2 - (z1 - 10)) <= 0.5;
      const eq2 = Math.abs(x2 + y2 + z2 - 60) <= 0.5;
      return eq1 && eq2;
    }
  },
  {
    enunciado: (
      <div>
        <p>En un cruce de avenidas, el semáforo principal tiene un ciclo de 80 segundos:</p>
        <ul>
          <li>Verde: 40 s</li>
          <li>Amarillo: 8 s</li>
          <li>Rojo: 32 s</li>
        </ul>
        <p>El <span>semáforo secundario</span> se ajustará en proporción al principal.</p>
        <p>Condiciones:</p>
        <ul>
          <li>El tiempo en verde del semáforo secundario será la mitad del tiempo verde del principal.</li>
          <li>El tiempo en amarillo será un tercio del tiempo en rojo del secundario.</li>
          <li>El ciclo total del semáforo secundario será igual al del principal (80 segundos).</li>
        </ul>
        <p>¿Cuánto tiempo debe durar el semáforo secundario en verde, amarillo y rojo?</p>
      </div>
    ),
    validacion: ({ x2, y2, z2 }) => {
      const x1 = 40; // verde SP
      const eq1 = Math.abs(x2 - x1 / 2) <= 0.5;
      const eq2 = Math.abs(y2 - z2 / 3) <= 0.5;
      const eq3 = Math.abs(x2 + y2 + z2 - 80) <= 0.5;
      return eq1 && eq2 && eq3;
    }
  },
  {
    enunciado: (
      <div>
        <p>En un cruce nocturno, el semáforo principal tiene un ciclo de 60 segundos:</p>
        <ul>
          <li>Verde: 18 s</li>
          <li>Amarillo: 6 s</li>
          <li>Rojo: 36 s</li>
        </ul>
        <p>Durante la noche, el <span>semáforo secundario</span> debe cambiar sus tiempos para optimizar el flujo.</p>
        <p>Condiciones:</p>
        <ul>
          <li>El tiempo en verde del semáforo secundario será un tercio del rojo del principal.</li>
          <li>El tiempo en amarillo será 6 segundos.</li>
          <li>El ciclo total del semáforo secundario será igual al del principal (60 segundos).</li>
        </ul>
        <p>¿Cuánto tiempo debe durar el semáforo secundario en verde, amarillo y rojo?</p>
      </div>
    ),
    validacion: ({ x2, y2, z2 }) => {
      const z1 = 36; // rojo SP
      const eq1 = Math.abs(x2 - (z1 / 3)) <= 0.5;
      const eq2 = Math.abs(y2 - 6) <= 0.5;
      const eq3 = Math.abs(x2 + y2 + z2 - 60) <= 0.5;
      return eq1 && eq2 && eq3;
    }
  }
];



const Proyecto2 = () => {
  const [ecuaciones, setEcuaciones] = useState("")
  const [valoresTexto, setValoresTexto] = useState("")
  const [subidas, setSubidas] = useState({ ecuaciones: false, valores: false })
  const [resultado, setResultado] = useState(null)
  const [showIntro, setShowIntro] = useState(true)
  const [problema, setProblema] = useState(null)
  const [mostrarAnimacion, setMostrarAnimacion] = useState(false)
  const semaforosRef = useRef(null)
  const [intentos, setIntentos] = useState(0)
  const [tiempo, setTiempo] = useState(0)
  const location = useLocation()

  useEffect(() => {
    let timer;
    if (!showIntro) {
      timer = setInterval(() => {
        setTiempo(prev => prev + 1) // incrementa cada segundo
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [showIntro])

  const variablesDadas = [
    { key: "x1", label: "Verde SP", color: "green", valor: 30 },
    { key: "y1", label: "Amarillo SP", color: "yellow", valor: 5 },
    { key: "z1", label: "Rojo SP", color: "red", valor: 25 },
  ]

  const variablesADefinir = [
    { key: "x2", label: "verde SS", color: "green" },
    { key: "y2", label: "amarillo SS", color: "yellow" },
    { key: "z2", label: "rojo SS", color: "red" },
  ]

  useEffect(() => {
    const random = Math.floor(Math.random() * problemasNivel1.length)
    setProblema(problemasNivel1[random])
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })

    // Ciclo de semáforo
    const interval = setInterval(() => {
      setTiempo(prev => (prev + 1) % 60) // ciclo de 60 seg
    }, 1000)
    return () => clearInterval(interval)
  }, [location.pathname])

  // Estado de semáforos según el tiempo
  const principalColor = () => {
    if (tiempo < 30) return "green"
    if (tiempo < 35) return "yellow"
    return "red"
  }

  const secundarioColor = () => {
    if (tiempo >= 35 && tiempo < 60) return "green"
    if (tiempo >= 60 - 10 && tiempo < 60) return "yellow"
    return "red"
  }

  const separar = (input) =>
    input.split(/\n|,/).map((s) => s.trim()).filter(Boolean)

  const subirEcuaciones = () => {
    if (ecuaciones.trim() === "") return
    const lines = separar(ecuaciones)

    const ecuacionesValidas = lines.filter(line => line.length > 0);
    if (ecuacionesValidas.length < 2 || ecuacionesValidas.length > 3) {
      alert("Debes ingresar entre 2 y 3 ecuaciones.")
      return
    }
    setSubidas((prev) => ({ ...prev, ecuaciones: true }))
    setResultado(null)
    setShowIntro(false)
  }

  const subirValores = () => {
    if (valoresTexto.trim() !== "") {
      setSubidas((prev) => ({ ...prev, valores: true }))
    }
  }

  const validarValores = () => {
    try {
      const lines = separar(valoresTexto)
      const valoresUsuario = { x1: 30, y1: 5, z1: 25 }

      lines.forEach((line) => {
        if (line.includes("=")) {
          let [varName, expr] = line.split("=").map(s => s.trim())
          try {

            valoresUsuario[varName] = Function(...Object.keys(valoresUsuario), `return ${expr}`)(...Object.values(valoresUsuario))
          } catch {
            valoresUsuario[varName] = NaN
          }
        }
      })

      const { x2, y2, z2 } = valoresUsuario

      if (problema && problema.validacion({ x2, y2, z2 })) {
        setResultado("correcto")
        setTimeout(() => {
          semaforosRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
          setMostrarAnimacion(true)
        }, 500)
      } else {
        setResultado("incorrecto")
        setMostrarAnimacion(false)
      }

      const nuevoIntento = intentos + 1
      setIntentos(nuevoIntento)
      sendData("Proyecto2", (tiempo / 60).toFixed(2), nuevoIntento)

    } catch (err) {
      console.error(err)
      setResultado("incorrecto")
      setMostrarAnimacion(false)

      const nuevoIntento = intentos + 1
      setIntentos(nuevoIntento)
      sendData("Proyecto2", (tiempo / 60).toFixed(2), nuevoIntento)
    }
  }


  return (
    <div>
      <FAS />
      <div className={styles.fondo}></div>
      <div className={styles.container} style={{ position: "relative", zIndex: 1 }}>
        <h2 className={styles.p1titulo}>
          <FaTrafficLight className={styles.icon} /> Proyecto 2: Distribución de semáforos
        </h2>
        <h3 className={styles.p1subtitulo}>Nivel 1</h3>



        {showIntro && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={styles.cardHighlight}
          >
            <p>¡Bienvenido al reto de los semáforos!</p>
          </motion.div>
        )}

        {problema && (
          <div className={styles.cardHighlight} style={{ marginTop: "15px" }}>
            <p>{problema.enunciado}</p>
            <div
              ref={semaforosRef}
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "20px",
                alignItems: "center",
              }}
            >
              {/* Semáforo principal */}
              <div style={{ textAlign: "center" }}>
                <p>Principal</p>
                <div className={styles.semaforo}>
                  <div className={`${styles.luz} ${styles.verde}`}></div>
                  <div className={`${styles.luz} ${styles.amarillo}`}></div>
                  <div className={`${styles.luz} ${styles.rojo}`}></div>
                </div>
              </div>

              {/* Semáforo secundario */}
              <div style={{ textAlign: "center" }}>
                <p>Secundario</p>
                <div className={styles.semaforo}>
                  <div className={`${styles.luz} ${mostrarAnimacion ? styles.verde : styles.apagado}`}></div>
                  <div className={`${styles.luz} ${mostrarAnimacion ? styles.amarillo : styles.apagado}`}></div>
                  <div className={`${styles.luz} ${mostrarAnimacion ? styles.rojo : styles.apagado}`}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.card}>

          {/* Variables dadas */}
          <div style={{ marginBottom: "15px" }}>
            <h4>Variables dadas (Semáforo Principal)</h4>
            <ul>
              {variablesDadas.map((v) => (
                <li key={v.key} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.1rem" }}>
                  <FaCircle color={v.color} size={20} /> {v.key} → {v.label} = {v.valor}
                </li>
              ))}
            </ul>
          </div>

          {/* Variables a definir */}
          <div>
            <h4>Variables a definir (Semáforo Secundario)</h4>
            <ul>
              {variablesADefinir.map((v) => (
                <li key={v.key} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.1rem" }}>
                  <FaCircle color={v.color} size={20} /> {v.key} → {v.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.card}>
          <h3>Ingresa tus ecuaciones</h3>
          <textarea
            value={ecuaciones}
            onChange={(e) => setEcuaciones(e.target.value)}
            placeholder={`Ejemplo:\nx = ...\ny = ...\nz = ...`}
            className={styles.textarea}
          />
          <button onClick={subirEcuaciones} className={styles.button}>Subir respuestas</button>
          {subidas.ecuaciones && <p>✅ Ecuaciones guardadas</p>}
        </div>

        <div className={styles.card}>
          <h3>Ingresa los valores que obtuviste</h3>
          <textarea
            value={valoresTexto}
            onChange={(e) => setValoresTexto(e.target.value)}
            placeholder={`Ejemplo:\nx = 1\ny = 2\nz = 3`}
            className={styles.textarea}
          />
          <button onClick={subirValores} className={styles.button}>Subir respuestas</button>
          {subidas.valores && <p>✅ Valores guardados</p>}
        </div>

        <button
          onClick={validarValores}
          disabled={!subidas.ecuaciones || !subidas.valores}
          className={styles.verifyButton}
        >
          Verificar
        </button>

        {resultado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.cardHighlight}
            style={{ marginTop: "20px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-around", fontSize: "2rem" }}>
              {variablesADefinir.map((v) => (
                <motion.div key={v.key} animate={{ y: [0, -20, 0] }} transition={{ duration: 0.5, repeat: 2 }} style={{ position: "relative" }}>
                  <FaCircle color={v.color} size={50} />
                  {resultado === "correcto" && <FaCheckCircle color="green" style={{ position: "absolute", top: -10, right: -10 }} />}
                  {resultado === "incorrecto" && <FaTimesCircle color="red" style={{ position: "absolute", top: -10, right: -10 }} />}
                </motion.div>
              ))}
            </div>
            <p style={{ textAlign: "center", marginTop: "15px", fontWeight: "bold" }}>
              {resultado === "correcto" ? "🎉 ¡Correcto! Bien hecho" : "❌ Intenta de nuevo"}
            </p>

            {resultado === "correcto" && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />}

            {resultado === "correcto" && (
              <Link to="/proyecto2n2" className={styles.button} style={{ marginTop: "20px", display: "inline-block" }}>
                Siguiente nivel
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
export default Proyecto2
