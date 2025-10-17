export const sendData = async (proyecto, tiempo, intentos) => {
  const scriptURL = "https://script.google.com/macros/s/AKfycbxYIL_v5aV63F31RFthb47PgnoMHgOlnzrvbAknSWK5wqMqEhCBn5lUVaWCRKdIQef2/exec"

  const data = { proyecto, tiempo, intentos}

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })

    const result = await response.text()
    console.log("✅ Datos enviados:", result)
  } catch (error) {
    console.error("❌ Error al enviar los datos:", error)
  }
}
