const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Proxy-Endpunkt
app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "Parameter 'url' fehlt." });
  }

  try {
    const response = await axios.get(targetUrl);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fehler beim Abrufen der URL." });
  }
});

// Server starten
app.listen(port, () => {
  console.log(`Proxy läuft unter http://localhost:${port}`);
});
