import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Inicio.module.css'

const Inicio = () => {
  const [matricula, setMatricula] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const savedMatricula = localStorage.getItem('matricula')
    if (savedMatricula) {
      navigate('/home')
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (matricula.trim() === '') return

    try {
      // Guarda localmente
      localStorage.setItem('matricula', matricula)

      // Envía a Google Sheets vía tu API
      const response = await fetch('/api/sendData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proyecto: 'Inicio',
          tiempo: '0',
          intentos: 1,
          matricula: matricula
        })
      })

      const result = await response.json()
      console.log('✅ Matrícula registrada:', result)

      // Redirige a Home
      navigate('/home')
    } catch (error) {
      console.error('❌ Error al registrar matrícula:', error)
    }
  }

  return (
    <div className={styles.inicioContainer}>
      <h1>Bienvenido</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="matricula">Ingresa tu matrícula:</label>
        <input
          type="text"
          id="matricula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default Inicio
