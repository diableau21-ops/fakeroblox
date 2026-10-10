const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Serveur Roblox en ligne !');
});

app.get('/api/user/:username', async (req, res) => {
  try {
    const username = req.params.username;

    const response = await fetch(
      'https://users.roblox.com/v1/users/search?keyword=' +
      encodeURIComponent(username) +
      '&limit=10'
    );

    const body = await response.text();

    if (!response.ok) {
      console.error('Erreur Roblox :', response.status, body);

      return res.status(502).json({
        error: 'La recherche Roblox a échoué.',
        statusRoblox: response.status
      });
    }

    res.type('application/json').send(body);
  } catch (error) {
    console.error('Erreur serveur :', error);

    res.status(500).json({
      error: 'Impossible de joindre Roblox.'
    });
  }
});

app.get('/api/avatar/:id', async (req, res) => {
  try {
    const response = await fetch(
      'https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=' +
      encodeURIComponent(req.params.id) +
      '&size=150x150&format=Png&isCircular=true'
    );

    const body = await response.text();

    if (!response.ok) {
      return res.status(502).json({
        error: 'Impossible de charger l’avatar.',
        statusRoblox: response.status
      });
    }

    res.type('application/json').send(body);
  } catch (error) {
    res.status(500).json({
      error: 'Impossible de joindre Roblox.'
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Serveur démarré sur le port ' + PORT);
});
