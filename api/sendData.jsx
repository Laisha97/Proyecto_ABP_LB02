export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" })
  }

  try {
    const { proyecto, tiempo, intentos } = JSON.parse(req.body)

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxYIL_v5aV63F31RFthb47PgnoMHgOlnzrvbAknSWK5wqMqEhCBn5lUVaWCRKdIQef2/exec"

    // Enviar los datos a Google Sheets sin esperar respuesta (no bloquea Vercel)
    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ proyecto, tiempo, intentos }),
      headers: { "Content-Type": "application/json" },
    }).catch((err) => console.error("Error enviando a Google Sheets:", err))

    // Responder inmediatamente para evitar el timeout
    res.status(200).json({ message: "✅ Datos enviados correctamente" })
  } catch (error) {
    console.error("Error en handler:", error)
    res.status(500).json({ message: "❌ Error interno", error: error.message })
  }
}
