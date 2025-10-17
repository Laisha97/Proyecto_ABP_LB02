const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxYIL_v5aV63F31RFthb47PgnoMHgOlnzrvbAknSWK5wqMqEhCBn5lUVaWCRKdIQef2/exec"
const VERCEL_ENDPOINT = "/api/sendData"

export const sendDataLocal = async (proyecto, tiempo, intentos) => {
  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ proyecto, tiempo, intentos }),
      headers: { "Content-Type": "application/json" },
    })
    console.log("✅ Local:", await res.text())
  } catch (err) {
    console.error("❌ Local:", err)
  }
}

export const sendDataVercel = async (proyecto, tiempo, intentos) => {
  try {
    const res = await fetch(VERCEL_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({ proyecto, tiempo, intentos }),
      headers: { "Content-Type": "application/json" },
    })
    console.log("✅ Vercel:", (await res.json()).message)
  } catch (err) {
    console.error("❌ Vercel:", err)
  }
}

// Función automática según entorno
export const sendData = async (proyecto, tiempo, intentos) => {
  if (window.location.hostname === "localhost") {
    await sendDataLocal(proyecto, tiempo, intentos)
  } else {
    await sendDataVercel(proyecto, tiempo, intentos)
  }
}
