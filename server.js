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
      'https://users.roblox.com/v1/usernames/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usernames: [username],
          excludeBannedUsers: false
        })
      }
    );

    const body = await response.text();

    if (!response.ok) {
      return res.status(502).json({
        error: 'La recherche Roblox a échoué.',
        statusRoblox: response.status
      });
    }

    const result =
