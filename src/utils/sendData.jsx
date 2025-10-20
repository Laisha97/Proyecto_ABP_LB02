export const sendData = async (proyecto, tiempo, intentos) => {
  try {
    const res = await fetch("/api/sendData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proyecto, tiempo, intentos }),
    })

    const result = await res.json()
    console.log("✅ Datos enviados:", result)
  } catch (err) {
    console.error("❌ Error al enviar los datos:", err)
  }
}
