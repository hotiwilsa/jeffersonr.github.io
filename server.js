const express = require('express');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'submissions.json');

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '../frontend')));

app.post('/api/contact', (req, res) => {
  try {
    const { nome, email, mensagem } = req.body || {};

    if (!nome || !email || !mensagem) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
    }

    const entry = {
      id: Date.now(),
      nome,
      email,
      mensagem,
      horario: new Date().toISOString()
    };

    let arr = [];
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      arr = JSON.parse(raw);
    }

    arr.push(entry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2), 'utf8');

    return res.status(201).json({ ok: true, id: entry.id });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
