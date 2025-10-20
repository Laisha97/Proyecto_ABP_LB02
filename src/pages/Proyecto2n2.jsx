import React, { useState, useEffect } from "react"
import { FaTrafficLight, FaCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import Confetti from "react-confetti"
import { motion } from "framer-motion"
import styles from "./Proyecto2n2.module.css"
import { HashLink } from "react-router-hash-link"
import FAS from "../Components/FAS"
import { useRef } from "react"
import { sendData } from "../utils/sendData"
import { useLocation } from "react-router-dom"


const problemasNivel2 = [
    {
        enunciado: (
            <div>
                <p>En un cruce, el semáforo principal tiene un ciclo de 80 segundos:</p>
                <ul>
                    <li>Verde: 40 s</li>
                    <li>Amarillo: 5 s</li>
                    <li>Rojo: 36 s</li>
                </ul>

                <p>Debes diseñar dos semáforos secundarios que se sincronicen con el principal para evitar choques.</p>

                <p>Condiciones:</p>
                <ul>
                    <li>SS1 debe tener su luz verde durante la mitad del tiempo que el principal está en rojo.</li>
                    <li>SS1 debe tener su luz amarilla durante 5 segundos.</li>
                    <li>El ciclo total de SS1 debe ser igual al ciclo del semáforo principal.</li>
                    <li>SS2 debe tener su luz verde 10 segundos más que la luz verde de SS1.</li>
                    <li>SS2 debe tener su luz amarilla igual a 5 segundos.</li>
                    <li>El ciclo total de SS2 debe ser igual al ciclo del semáforo principal.</li>
                </ul>

                <p>Primero escribe tus ecuaciones usando estas condiciones, luego coloca los valores resultantes en otro cuadro.</p>
            </div>
        ),
        variablesDadas: { x1: 40, y1: 5, z1: 36 },
        validacion: ({ x2, y2, z2, x3, y3, z3, z1 }) => {
            const eq1 = Math.abs(x2 - z1 / 2) <= 0.5
            const eq2 = Math.abs(y2 - 5) <= 0.5
            const eq3 = Math.abs(x2 + y2 + z2 - 80) <= 0.5

            const eq4 = Math.abs(x3 - (x2 + 10)) <= 0.5
            const eq5 = Math.abs(y3 - 5) <= 0.5
            const eq6 = Math.abs(x3 + y3 + z3 - 80) <= 0.5

            return eq1 && eq2 && eq3 && eq4 && eq5 && eq6
        }
    },
    {
        enunciado: (
            <div>
                <p>En un cruce, el semáforo principal tiene un ciclo de 70 segundos:</p>
                <ul>
                    <li>Verde: 30 s</li>
                    <li>Amarillo: 10 s</li>
                    <li>Rojo: 30 s</li>
                </ul>

                <p>Debes diseñar dos semáforos secundarios que se sincronicen con el principal para evitar choques.</p>

                <p>Condiciones:</p>
                <ul>
                    <li>SS1 debe tener su luz verde durante un tercio del tiempo que el principal está en verde.</li>
                    <li>SS1 debe tener su luz amarilla durante un quinto del tiempo que el principal está en rojo.</li>
                    <li>El ciclo total de SS1 debe ser igual al ciclo del semáforo principal.</li>
                    <li>SS2 debe tener su luz verde 5 segundos más que la luz verde de SS1.</li>
                    <li>SS2 debe tener su luz amarilla igual a la de SS1.</li>
                    <li>El ciclo total de SS2 debe ser igual al ciclo del semáforo principal.</li>
                </ul>

                <p>Primero escribe tus ecuaciones usando estas condiciones, luego coloca los valores resultantes en otro cuadro.</p>
            </div>
        ),
        variablesDadas: { x1: 30, y1: 10, z1: 30 },
        validacion: ({ x2, y2, z2, x3, y3, z3, x1, z1 }) => {
            const eq1 = Math.abs(x2 - x1 / 3) <= 0.5
            const eq2 = Math.abs(y2 - z1 / 5) <= 0.5
            const eq3 = Math.abs(x2 + y2 + z2 - 70) <= 0.5

            const eq4 = Math.abs(x3 - (x2 + 5)) <= 0.5
            const eq5 = Math.abs(y3 - y2) <= 0.5
            const eq6 = Math.abs(x3 + y3 + z3 - 70) <= 0.5

            return eq1 && eq2 && eq3 && eq4 && eq5 && eq6
        }
    },
    {
        enunciado: (
            <div>
                <p>En un cruce, el semáforo principal tiene un ciclo de 90 segundos:</p>
                <ul>
                    <li>Verde: 45 s</li>
                    <li>Amarillo: 15 s</li>
                    <li>Rojo: 30 s</li>
                </ul>

                <p>Debes diseñar dos semáforos secundarios que se sincronicen con el principal para evitar choques.</p>

                <p>Condiciones:</p>
                <ul>
                    <li>SS1 debe tener su luz verde 10 segundos menos que el tiempo que el semáforo principal está en rojo.</li>
                    <li>SS1 debe tener su luz amarilla un tercio del tiempo verde del principal.</li>
                    <li>El ciclo total de SS1 debe ser igual al ciclo del semáforo principal.</li>
                    <li>SS2 debe tener su luz verde 5 segundos menos que la luz verde de SS1.</li>
                    <li>SS2 debe tener su luz amarilla 2 segundos más que la luz amarilla de SS1.</li>
                    <li>El ciclo total de SS2 debe ser igual al ciclo del semáforo principal.</li>
                </ul>

                <p>Primero escribe tus ecuaciones usando estas condiciones, luego coloca los valores resultantes en otro cuadro.</p>
            </div>
        ),
        variablesDadas: { x1: 45, y1: 15, z1: 30 },
        validacion: ({ x2, y2, z2, x3, y3, z3, x1, z1 }) => {
            const eq1 = Math.abs(x2 - (z1 - 10)) <= 0.5
            const eq2 = Math.abs(y2 - (x1 / 3)) <= 0.5
            const eq3 = Math.abs(x2 + y2 + z2 - 90) <= 0.5

            const eq4 = Math.abs(x3 - (x2 - 5)) <= 0.5
            const eq5 = Math.abs(y3 - (y2 + 2)) <= 0.5
            const eq6 = Math.abs(x3 + y3 + z3 - 90) <= 0.5

            return eq1 && eq2 && eq3 && eq4 && eq5 && eq6
        }
    }
]

const Proyecto2n2 = () => {
    const [ecuaciones, setEcuaciones] = useState("")
    const [valoresTexto, setValoresTexto] = useState("")
    const [subidas, setSubidas] = useState({ ecuaciones: false, valores: false })
    const [resultado, setResultado] = useState(null)
    const [showIntro, setShowIntro] = useState(true)
    const [problema, setProblema] = useState(null)
    const [mostrarAnimacion, setMostrarAnimacion] = useState(false)
    const [tiempo, setTiempo] = useState(0)
    const semaforosRef = useRef(null)
    const [intentos, setIntentos] = useState(0)
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

    const scrollWithOffset = (el) => {
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset
        const yOffset = -80; // Ajusta este valor si tienes un encabezado fijo
        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' })
    }
    const variablesDadas = [
        { key: "x1", label: "Verde SP", color: "green", valor: 30 },
        { key: "y1", label: "Amarillo SP", color: "yellow", valor: 5 },
        { key: "z1", label: "Rojo SP", color: "red", valor: 25 },
    ]

    const variablesADefinir = [
        { key: "x2", label: "verde SS1", color: "green" },
        { key: "y2", label: "amarillo SS1", color: "yellow" },
        { key: "z2", label: "rojo SS1", color: "red" },
    ]

    const variablesADefinir2 = [
        { key: "x3", label: "verde SS2", color: "green" },
        { key: "y3", label: "amarillo SS2", color: "yellow" },
        { key: "z3", label: "rojo SS2", color: "red" },
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

        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })

        const interval = setInterval(() => {
            setTiempo(prev => (prev + 1) % 60); // ciclo de 60 seg
        }, 1000)

        return () => clearInterval(interval)
    }, [])

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
        if (ecuacionesValidas.length < 2 || ecuacionesValidas.length > 7) {
            alert("Debes ingresar entre 2 y 7 ecuaciones.")
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
            const valoresUsuario = {
                x1: problema?.variablesDadas?.x1 ?? 30,
                y1: problema?.variablesDadas?.y1 ?? 5,
                z1: problema?.variablesDadas?.z1 ?? 25,
                x2: 0, y2: 0, z2: 0,
                x3: 0, y3: 0, z3: 0
            }

            lines.forEach((line) => {
                if (line.includes("=")) {
                    let [varName, expr] = line.split("=").map(s => s.trim());
                    try {

                        valoresUsuario[varName] = Function(...Object.keys(valoresUsuario), `return ${expr}`)(...Object.values(valoresUsuario));
                    } catch {
                        valoresUsuario[varName] = NaN;
                    }
                }
            })

            const { x2, y2, z2, x3, y3, z3 } = valoresUsuario

            if (problema && problema.validacion(valoresUsuario)) {
                setResultado("correcto")
                setTimeout(() => {
                    semaforosRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                    setMostrarAnimacion(true)
                }, 500);
            } else {
                setResultado("incorrecto")
                setMostrarAnimacion(false)
            }
            const nuevoIntento = intentos + 1
            setIntentos(nuevoIntento)

            sendData("Proyecto2n2", (tiempo / 60).toFixed(2), nuevoIntento)

        } catch (err) {
            console.error(err)
            setResultado("incorrecto")
            setMostrarAnimacion(false)

            const nuevoIntento = intentos + 1
            setIntentos(nuevoIntento)
            sendData("Proyecto2n2", (tiempo / 60).toFixed(2), nuevoIntento)
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
                <h3 className={styles.p1subtitulo}>Nivel 2</h3>



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
                                <p>Secundario 1</p>
                                <div className={styles.semaforo}>
                                    <div className={`${styles.luz} ${mostrarAnimacion ? styles.verde : styles.apagado}`}></div>
                                    <div className={`${styles.luz} ${mostrarAnimacion ? styles.amarillo : styles.apagado}`}></div>
                                    <div className={`${styles.luz} ${mostrarAnimacion ? styles.rojo : styles.apagado}`}></div>
                                </div>

                                {/* Semáforo secundario 2 */}
                                <div style={{ textAlign: "center" }}>
                                    <p>Secundario 2</p>
                                    <div className={styles.semaforo}>
                                        <div className={`${styles.luz} ${mostrarAnimacion ? styles.verde : styles.apagado}`}></div>
                                        <div className={`${styles.luz} ${mostrarAnimacion ? styles.amarillo : styles.apagado}`}></div>
                                        <div className={`${styles.luz} ${mostrarAnimacion ? styles.rojo : styles.apagado}`}></div>
                                    </div>
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

                    <div>
                        <h4>Variables a definir (Semáforo Secundario2)</h4>
                        <ul>
                            {variablesADefinir2.map((v) => (
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
                            <HashLink
                                smooth
                                to="/#projects"
                                className={styles.button}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    gap: "10px",
                                    fontWeight: "bold",
                                    fontSize: "1.2rem",
                                    cursor: "pointer"
                                }}

                                scroll={el => scrollWithOffset(el)}>

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
export default Proyecto2n2
