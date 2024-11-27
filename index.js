const express = require('express');
const http = require('http');
const https = require('https');
const app = express();

app.use((req, res) => {
  const targetUrl = req.url.substring(1); // Entfernt das führende "/" aus der URL
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
