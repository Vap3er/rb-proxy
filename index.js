const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS aktivieren
app.use(cors());

// Root-Route
app.get("/", (req, res) => {
    res.send("Proxy is running!");
});

// Proxy-Route
app.get("/proxy", async (req, res) => {
    const targetUrl = req.query.url; // Ziel-URL aus der Query

    if (!targetUrl) {
        return res.status(400).json({ error: "Bitte eine 'url'-Query angeben." });
    }

    try {
        const response = await axios.get(targetUrl);
        res.status(response.status).json(response.data); // Antwort weitergeben
    } catch (error) {
        console.error("Fehler beim Abrufen der URL:", error.message);
        res.status(500).json({ error: "Fehler beim Abrufen der URL." });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy läuft auf Port ${PORT}`);
});
