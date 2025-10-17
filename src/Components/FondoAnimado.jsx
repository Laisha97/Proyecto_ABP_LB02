import React from "react"
import { FaLaptop, FaMobileAlt, FaTv } from "react-icons/fa"
import styles from "./FondoAnimado.module.css"

const iconos = [<FaLaptop />, <FaMobileAlt />, <FaTv />]

export default function FondoAnimado() {
  return (
    <div className={styles.fondo}>
    <div className={styles.capaBlanca}></div>
      {Array.from({ length: 15 }).map((_, i) => {
        const Icono = iconos[Math.floor(Math.random() * iconos.length)]
        return (
          <div
            key={i}
            className={styles.icono}
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              fontSize: `${2 + Math.random() * 4}rem`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.2 + Math.random() * 0.5,
            }}
          >
            {Icono}
          </div>
        )
      })}
    </div>
  )
}
