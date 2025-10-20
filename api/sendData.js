export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { proyecto, tiempo, intentos } = req.body;

    // ⚠️ Aquí pones tu URL del Google Script correcto (el que termina en /exec)
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxYIL_v5aV63F31RFthb47PgnoMHgOlnzrvbAknSWK5wqMqEhCBn5lUVaWCRKdIQef2/exec";

    // Se envían los datos al Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proyecto, tiempo, intentos }),
    });

    const text = await response.text();

    return res.status(200).json({ message: "Datos enviados correctamente", response: text });
  } catch (error) {
    console.error("Error en la API de Vercel:", error);
    return res.status(500).json({ message: "Error enviando datos", error: error.message });
  }
}
