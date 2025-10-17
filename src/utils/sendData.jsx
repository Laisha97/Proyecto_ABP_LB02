const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxYIL_v5aV63F31RFthb47PgnoMHgOlnzrvbAknSWK5wqMqEhCBn5lUVaWCRKdIQef2/exec"
const VERCEL_ENDPOINT = "/api/sendData"

export const sendDataLocal = async (proyecto, tiempo, intentos) => {
  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ proyecto, tiempo, intentos }),
      headers: { "Content-Type": "application/json" },
    })
    const data = await res.json()
    console.log("✅ Datos enviados:", data.message)
  } catch (err) {
    console.error("❌ Error enviando datos:", err)
  }
}

export const sendDataVercel = async (proyecto, tiempo, intentos) => {
  try {
    const res = await fetch(VERCEL_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({ proyecto, tiempo, intentos }),
      headers: { "Content-Type": "application/json" },
    })
    const data = await res.json()
    console.log(data.message)
  } catch (err) {
    console.error("Error enviando a Vercel endpoint:", err)
  }
}
