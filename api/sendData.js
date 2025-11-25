export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" })
  }

  try {
    const { proyecto, tiempo, intentos, matricula } = req.body
    console.log("📥 Datos recibidos en Vercel:", req.body)

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyLXkCdhwNrCtCBn42BYt1SOMfyzHe5f53ZK2L8Dbu1cIek5jB0fzgzXR93oNScb0Cf/exec"

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proyecto, tiempo, intentos, matricula }),
    })

    const text = await response.text()

    return res.status(200).json({ message: "Datos enviados correctamente", response: text })
  } catch (error) {
    console.error("Error en la API de Vercel:", error)
    return res.status(500).json({ message: "Error enviando datos", error: error.message })
  }
}
