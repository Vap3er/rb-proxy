const express = require('express');
const request = require('request');
const app = express();

const proxyURL = 'http://212.62.95.45:8080'; // Hier kannst du deinen Proxy-Server ändern

app.use((req, res) => {
  const url = req.url.substring(1); // Entfernt das führende "/" aus der URL
  const options = {
    url: url,
    proxy: proxyURL,
  };

  request(options)
    .on('error', (err) => {
      console.error('Proxy Error:', err);
      res.status(500).send('Proxy Error');
    })
    .pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy-Server läuft auf Port ${PORT}`);
});
