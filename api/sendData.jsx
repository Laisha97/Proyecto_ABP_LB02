export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" })
  }

  try {
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxYIL_v5aV63F31RFthb47PgnoMHgOlnzrvbAknSWK5wqMqEhCBn5lUVaWCRKdIQef2/exec"

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: req.body, 
    });

    const data = await response.text()
    console.log("Respuesta de Google Script:", data)

    return res.status(200).json({ message: "Datos enviados a Google Sheets", data })
  } catch (error) {
    console.error("Error al enviar los datos:", error)
    return res.status(500).json({ message: "Error al enviar datos" })
  }
}
