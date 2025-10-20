export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" })
  }

  try {
    const { proyecto, tiempo, intentos } = JSON.parse(req.body)

    const response = await fetch("https://script.google.com/macros/s/AKfycbxYIL_v5aV63F31RFthb47PgnoMHgOlnzrvbAknSWK5wqMqEhCBn5lUVaWCRKdIQef2/exec", {
      method: "POST",
      body: JSON.stringify({ proyecto, tiempo, intentos }),
      headers: { "Content-Type": "application/json" },
    })

    const text = await response.text()

    return res.status(200).json({ message: "Datos enviados correctamente", response: text })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error al enviar los datos", error })
  }
}
