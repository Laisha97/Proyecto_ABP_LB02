import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Inicio.module.css'

const Inicio = () => {
    const [matricula, setMatricula] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedMatricula = localStorage.getItem('matricula')
            if (savedMatricula) {
                navigate('/home')
            }
        }
    }, [navigate])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (matricula.trim() === '') return

        navigate('/home')
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem('matricula', matricula)
            }


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


        } catch (error) {
            console.error('❌ Error al registrar matrícula:', error)
        }
    }

    return (
        <div className={styles.inicioContainer}>
            <div className={styles.contentWrapper}>
                <h1 className={styles.titulo}>Te damos la bienvenida a EDDI | Educación Digital</h1>
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.fieldGroup}>
                            <label htmlFor="matricula" className={styles.label}>
                                Ingresa tu matrícula:
                            </label>
                            <input
                                type="text"
                                id="matricula"
                                value={matricula}
                                onChange={(e) => setMatricula(e.target.value)}
                                required
                            />
                            <button type="submit">Entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Inicio
