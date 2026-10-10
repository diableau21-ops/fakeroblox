const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Serveur Roblox en ligne !');
});

app.get('/api/user/:username', async (req, res) => {
  try {
    const response = await fetch(
      'https://users.roblox.com/v1/users/search?keyword=' +
      encodeURIComponent(req.params.username) +
      '&limit=10'
    );

    if (!response.ok) {
      return res.status(502).json({
        error: 'La recherche Roblox a échoué.'
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
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

    if (!response.ok) {
      return res.status(502).json({
        error: 'Impossible de charger l’avatar.'
      });
    }

    res.json(await response.json());
  } catch (error) {
    res.status(500).json({
      error: 'Impossible de joindre Roblox.'
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Serveur démarré sur le port ' + PORT);
});
