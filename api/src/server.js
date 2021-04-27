require('dotenv-safe').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/login', (req, res, next) => {
  if (req.body.email && req.body.password) {
    const id = 1;
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 500,
    });
    return res.json({ auth: true, token: token });
  }

  res.status(500).json({ message: 'Login inválido!' });
});

app.listen(3333);
console.log('Servidor escutando na porta 3333');
