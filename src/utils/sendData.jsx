export const sendData = async (proyecto, tiempo, intentos, matricula) => {
  try {
    const response = await fetch("/api/sendData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proyecto, tiempo, intentos, matricula }),
    })

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.status}`)
    }

    const result = await response.json()
    console.log("✅ Envío a Vercel:", result)
  } catch (error) {
    console.error("❌ Error enviando datos:", error)
  }
}
