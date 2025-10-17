export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: { "Content-Type": "application/json" }
      });
      const text = await response.text();
      res.status(200).json({ message: text });
    } catch (err) {
      res.status(500).json({ message: "Error al enviar datos", error: err.message });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
