import React, { useState, useEffect } from "react"
import { FaHome, FaLaptop, FaMobileAlt, FaTv, FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import Confetti from "react-confetti"
import { evaluate } from "mathjs"
import { motion } from "framer-motion"
import styles from "./Proyecto1.module.css"
import { Link } from "react-router-dom"
import FondoAnimado from "../Components/FondoAnimado"
import { sendData } from "../utils/sendData"
import { useLocation } from "react-router-dom"

// Definición de problemas nivel 1
const problemasNivel1 = [
  {
    enunciado: `En tu casa hay una laptop, una TV y un celular.
    La laptop necesita 20 Mbps más que el celular,
    y la TV necesita el doble de lo que recibe el celular.
    ¿Cómo se debe repartir el internet para usar exactamente 100 Mbps?`,
    validacion: ({ x, y, z }) =>
      Math.abs(x - (y + 20)) <= 0.5 &&
      Math.abs(z - 2 * y) <= 0.5 &&
      Math.abs(x + y + z - 100) <= 0.5,
  },
  {
    enunciado: `En tu casa hay una laptop, una TV y un celular.
    El celular consume la mitad de lo que consume la laptop,
    y la TV consume lo mismo que la laptop.
    ¿Cómo repartir el internet para usar exactamente 100 Mbps?`,
    validacion: ({ x, y, z }) =>
      Math.abs(y - x / 2) <= 0.5 &&
      Math.abs(z - x) <= 0.5 &&
      Math.abs(x + y + z - 100) <= 0.5,
  },
  {
    enunciado: `En tu casa hay una laptop, una TV y un celular.
    La TV consume 40 Mbps más que la laptop,
    y el celular consume la mitad de la TV.
    ¿Cómo repartir el internet para usar exactamente 120 Mbps?`,
    validacion: ({ x, y, z }) =>
      Math.abs(z - (x + 40)) <= 0.5 &&
      Math.abs(y - z / 2) <= 0.5 &&
      Math.abs(x + y + z - 120) <= 0.5,
  },
]

const Proyecto1 = () => {
  const [ecuaciones, setEcuaciones] = useState("")
  const [valoresTexto, setValoresTexto] = useState("")
  const [subidas, setSubidas] = useState({ ecuaciones: false, valores: false })
  const [resultado, setResultado] = useState(null)
  const [showIntro, setShowIntro] = useState(true)
  const [problema, setProblema] = useState(null)
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

  const variablesDefinidas = [
    { key: "x", label: "laptop", icon: <FaLaptop /> },
    { key: "y", label: "celular", icon: <FaMobileAlt /> },
    { key: "z", label: "tv", icon: <FaTv /> },
  ]

  useEffect(() => {
    const storedProblema = sessionStorage.getItem("problemaNivel1")
    if (storedProblema) {
      setProblema(JSON.parse(storedProblema))
    } else {
      const random = Math.floor(Math.random() * problemasNivel1.length)
      const selected = problemasNivel1[random]
      setProblema(selected)
      sessionStorage.setItem("problemaNivel1", JSON.stringify(selected))
    }

    // Mantener scroll al top
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, [])

  const separar = (input) =>
    input.split(/\n|,/).map((s) => s.trim()).filter(Boolean)

  const subirEcuaciones = () => {
    if (ecuaciones.trim() === "") return
    const lines = separar(ecuaciones)
    if (lines.length !== 3) {
      alert("Debes ingresar exactamente 3 ecuaciones.")
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
      const valoresUsuario = {}
      lines.forEach((line) => {
        if (line.includes("=")) {
          const [varName, val] = line.split("=").map((s) => s.trim())
          valoresUsuario[varName] = Number(val)
        }
      })

      const { x, y, z } = valoresUsuario

      const esCorrecto = problema && problema.validacion({ x, y, z })
      setResultado(esCorrecto ? "correcto" : "incorrecto")

      const nuevoIntento = intentos + 1
      setIntentos(nuevoIntento)

      sendData("Proyecto1", (tiempo / 60).toFixed(2), nuevoIntento)

    } catch (err) {
      console.error(err)
      setResultado("incorrecto")

      sendData("Proyecto1", (tiempo / 60).toFixed(2), nuevoIntento)
    }
  }

  return (
    <div>
      <FondoAnimado />
      <div className={styles.container} style={{ position: "relative", zIndex: 1 }}>
        <h2 className={styles.p1titulo}>
          <FaHome className={styles.icon} /> Proyecto 1: Distribución del internet en casa
        </h2>
        <h3 className={styles.p1subtitulo}>Nivel 1</h3>

        {showIntro && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={styles.cardHighlight}
          >
            <p>¡Bienvenido al reto de la casa!</p>
          </motion.div>
        )}

        {problema && (
          <div className={styles.cardHighlight} style={{ marginTop: "15px" }}>
            <p>{problema.enunciado}</p>
            <p style={{ marginTop: "10px" }}>⬇ Aquí están tus dispositivos:</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "10px",
                fontSize: "2rem",
              }}
            >
              <FaLaptop />
              <FaMobileAlt />
              <FaTv />
            </div>
          </div>
        )}

        <div className={styles.card}>
          <h3>Variables definidas</h3>
          <ul>
            {variablesDefinidas.map((v) => (
              <li
                key={v.key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "1.2rem",
                }}
              >
                {v.icon} {v.key} → {v.label}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.card}>
          <h3>Ingresa tus ecuaciones</h3>
          <textarea
            value={ecuaciones}
            onChange={(e) => setEcuaciones(e.target.value)}
            placeholder={`Ejemplo:\nx = ...\ny = ...\nz = ...`}
            className={styles.textarea}
          />
          <button onClick={subirEcuaciones} className={styles.button}>
            Subir respuestas
          </button>
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
          <button onClick={subirValores} className={styles.button}>
            Subir respuestas
          </button>
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                fontSize: "2rem",
              }}
            >
              {variablesDefinidas.map((v) => (
                <motion.div
                  key={v.key}
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                  style={{ position: "relative" }}
                >
                  {v.icon}
                  {resultado === "correcto" && (
                    <FaCheckCircle
                      color="green"
                      style={{ position: "absolute", top: -10, right: -10 }}
                    />
                  )}
                  {resultado === "incorrecto" && (
                    <FaTimesCircle
                      color="red"
                      style={{ position: "absolute", top: -10, right: -10 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
            <p
              style={{
                textAlign: "center",
                marginTop: "15px",
                fontWeight: "bold",
              }}
            >
              {resultado === "correcto"
                ? "🎉 ¡Correcto! Bien hecho"
                : "❌ Intenta de nuevo"}
            </p>

            {resultado === "correcto" && (
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
              />
            )}

            {resultado === "correcto" && (
              <Link
                to="/proyecto1n2"
                className={styles.button}
                style={{ marginTop: "20px", display: "inline-block" }}
              >
                Siguiente nivel
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Proyecto1
