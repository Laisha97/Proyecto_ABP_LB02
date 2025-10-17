const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxYIL_v5aV63F31RFthb47PgnoMHgOlnzrvbAknSWK5wqMqEhCBn5lUVaWCRKdIQef2/exec"

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: { "Content-Type": "application/json" },
      })
      const text = await response.text()
      res.status(200).json({ message: text })
    } catch (err) {
      res.status(500).json({ message: "Error enviando datos a Google Sheets", error: err.message })
    }
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}
