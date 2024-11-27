const express = require('express');
const http = require('http');
const https = require('https');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <form method="post" action="/proxy">
      <label for="url">Ziel-URL:</label>
      <input type="text" id="url" name="url" required>
      <button type="submit">Absenden</button>
    </form>
  `);
});

app.post('/proxy', (req, res) => {
  const targetUrl = req.body.url;
  if (!targetUrl) {
    return res.status(400).send('Bad Request: Target URL not specified');
  }

  const protocol = targetUrl.startsWith('https') ? https : http;
  protocol.get(targetUrl, (proxyRes) => {
    proxyRes.pipe(res, { end: true });
  }).on('error', (err) => {
    console.error('Proxy Error:', err);
    res.status(500).send('Proxy Error');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy-Server läuft auf Port ${PORT}`);
});
