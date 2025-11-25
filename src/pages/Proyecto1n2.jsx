import React, { useState, useEffect } from "react"
import { FaHome, FaLaptop, FaMobileAlt, FaTv, FaCheckCircle, FaTimesCircle, FaTabletAlt } from "react-icons/fa"
import Confetti from "react-confetti"
import { evaluate } from "mathjs"
import { motion } from "framer-motion"
import styles from "./Proyecto1n2.module.css"
import { HashLink } from "react-router-hash-link"
import FondoAnimado from "../Components/FondoAnimado"
import { sendData } from "../utils/sendData"
import { useLocation } from "react-router-dom"

const problemasNivel2 = [
  {
    enunciado: (
      <>
        <p>En tu casa, la laptop recibe 10 Mbps más que el doble del celular.
          La tablet recibe 5 Mbps menos que la mitad de la TV.
          La suma del celular y la TV es igual a la suma de la laptop y la tablet.
        </p>
        <p>
          Si x, y y z representan el consumo de internet de cada dispositivo, ¿cómo deben repartirse para que el total sea de 200 Mbps?
        </p>
      </>
    ),
    validacion: ({ x, y, z, w }) =>
      Math.abs(x - (2 * y + 10)) <= 0.5 &&
      Math.abs(w - (z / 2 - 5)) <= 0.5 &&
      Math.abs(y + z - (x + w)) <= 0.5 &&
      Math.abs(x + y + z + w - 200) <= 0.5
  },
  {
    enunciado: (
      <>
        <p>En tu casa hay una laptop, una TV, un celular y una tablet.
          La laptop y la tablet juntos consumen 30 Mbps más que la TV y el celular.
          La laptop recibe 5 Mbps más que el celular.
          La tablet recibe la mitad del consumo de la laptop.
        </p>
        <p>
          Si x, y y z representan el consumo de internet de cada dispositivo, ¿cómo deben repartirse para que el total sea de 180 Mbps?
        </p>
      </>
    ),
    validacion: ({ x, y, z, w }) =>
      Math.abs((x + w) - (z + y + 30)) <= 0.5 &&
      Math.abs(x - (y + 5)) <= 0.5 &&
      Math.abs(w - (x / 2)) <= 0.5 &&
      Math.abs(x + y + z + w - 180) <= 0.5
  },
  {
    enunciado: (
      <>
        <p>En tu casa la TV recibe el doble de lo que recibe el celular.
          La laptop recibe 20 Mbps menos que la suma del tablet y el celular.
          El tablet recibe 10 Mbps más que la mitad del celular.
        </p>
        <p>
          Si x, y y z representan el consumo de internet de cada dispositivo, ¿cómo deben repartirse para que el total sea de 220 Mbps?
        </p>
      </>
    ),
    validacion: ({ x, y, z, w }) =>
      Math.abs(z - 2 * y) <= 0.5 &&
      Math.abs(x - (w + y - 20)) <= 0.5 &&
      Math.abs(w - (y / 2 + 10)) <= 0.5 &&
      Math.abs(x + y + z + w - 220) <= 0.5

  },
]

const Proyecto1n2 = () => {
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
    { key: "w", label: "tablet", icon: <FaTabletAlt /> }
  ]

  useEffect(() => {

    const storedIndex = sessionStorage.getItem("problemaNivel2Index")

    if (storedIndex !== null) {

      setProblema(problemasNivel2[parseInt(storedIndex, 10)])
    } else {

      const random = Math.floor(Math.random() * problemasNivel2.length)
      setProblema(problemasNivel2[random])
      sessionStorage.setItem("problemaNivel2Index", random)
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, [])



  const separar = (input) =>
    input.split(/\n|,/).map((s) => s.trim()).filter(Boolean)

  const subirEcuaciones = () => {
    if (ecuaciones.trim() === "") return
    const lines = separar(ecuaciones)
    if (lines.length !== 4) {
      alert("Debes ingresar exactamente 4 ecuaciones.")
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
        const lines = valoresTexto.split(/\n|,/).map((s) => s.trim()).filter(Boolean);
  
        const valoresUsuario = {};
  
        lines.forEach((line) => {
          const match = line.match(/^([xyz])\s*=\s*(-?\d+(\.\d+)?)$/);
          if (match) {
            const varName = match[1];
            const val = parseFloat(match[2]);
            valoresUsuario[varName] = val;
          }
        });
  
        const { x, y, z, w } = valoresUsuario
  
        if (x === undefined || y === undefined || z === undefined || w === undefined) {
          alert("Debes ingresar x, y, z y w correctamente.")
          return;
        }
  
        const esCorrecto = problema && problema.validacion({ x, y, z, w })
        setResultado(esCorrecto ? "correcto" : "incorrecto")
  
        const nuevoIntento = intentos + 1
        setIntentos(nuevoIntento)
  
        const matricula = typeof window !== "undefined"
          ? localStorage.getItem("matricula")
          : null;
  
        console.log("📌 Matricula enviada desde Proyecto1n2:", matricula)
  
        if (!matricula) {
          console.warn("⚠️ No se encontró matrícula en localStorage antes de sendData")
        }
  
        sendData("Proyecto1n2", (tiempo / 60).toFixed(2), nuevoIntento, matricula)
  
      } catch (err) {
        console.error("❌ Error al validar:", err)
        setResultado("incorrecto")
  
        const nuevoIntento = intentos + 1
        setIntentos(nuevoIntento)
  
        const matricula = typeof window !== "undefined"
          ? localStorage.getItem("matricula")
          : null
  
        console.log("📌 Matricula enviada desde Proyecto1n2 (catch):", matricula)
  
        if (!matricula) {
          console.warn("⚠️ No se encontró matrícula en localStorage antes de sendData (catch)")
        }
  
        sendData("Proyecto1n2", (tiempo / 60).toFixed(2), nuevoIntento, matricula)
      }
    }

  return (
    <div>
      <FondoAnimado />
      <div className={styles.container} style={{ position: "relative", zIndex: 1 }}>
        <h2 className={styles.p1titulo}>
          <FaHome className={styles.icon} /> Proyecto 1: Distribución del internet en casa
        </h2>
        <h3 className={styles.p1subtitulo}>Nivel 2</h3>

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
              <FaTabletAlt />
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
          <h4 className={styles.minu}>(letras minúsculas)</h4>

          <textarea
            value={ecuaciones}
            onChange={(e) => setEcuaciones(e.target.value)}
            placeholder={`Ejemplo:\nx = ...\ny = ...\nz = ......\nw=...`}
            className={styles.textarea}
          />
          <button onClick={subirEcuaciones} className={styles.button}>
            Subir respuestas
          </button>
          {subidas.ecuaciones && <p>✅ Ecuaciones guardadas</p>}
        </div>

        <div className={styles.card}>
          <h3>Ingresa los valores que obtuviste</h3>
          <h4 className={styles.minu}>(letras minúsculas)</h4>

          <textarea
            value={valoresTexto}
            onChange={(e) => setValoresTexto(e.target.value)}
            placeholder={`Ejemplo:\nx = 1\ny = 2\nz = 3\nw = 4`}
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
              <HashLink
                smooth
                to="/#projects"
                className={styles.button}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  textDecoration: "none",
                  color: "inherit",
                  gap: "10px",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  cursor: "pointer"
                }}
              >
                ¡¡Haz completado este reto!!<br />
                Prueba tus habilidades con otro reto (¡haz clic aquí!)
              </HashLink>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Proyecto1n2
