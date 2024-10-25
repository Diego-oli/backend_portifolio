const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const admin = require("firebase-admin");
const serviceAccount = require("./chave_firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(cors());
app.use(express.json());

let cards = [
  { title: ' Cartão boso ', value: 'R$ 150,00', image: 'https://hashtag.blogfolha.uol.com.br/files/2021/01/Eq-RgudXMAA3CnO.jpg' },
  { title: 'Cartão bosonario', value: 'R$ 300,00', image: 'https://hashtag.blogfolha.uol.com.br/files/2021/01/Eq-RgudXMAA3CnO.jpg' },
  { title: 'Cartão bolsonaro', value: 'R$ 500,00', image: 'https://hashtag.blogfolha.uol.com.br/files/2021/01/Eq-RgudXMAA3CnO.jpg' },
  { title: 'Cartão lula', value: 'R$ 200,00', image: 'https://hashtag.blogfolha.uol.com.br/files/2021/01/Eq-RgudXMAA3CnO.jpg' },

];

app.get('/cards', (req, res) => {
  res.json({ cards });
});

app.post('/cards', (req, res) => {
  const { title, value, image } = req.body;

  if (!title || !value || !image) {
    res.status(400).send('Dados incompletos. Certifique-se de fornecer título, valor e imagem.');
  } else {
    const newCard = { title, value, image };
    cards.push(newCard);
    res.status(201).json(newCard);
  }
});

app.put('/cards/:title', (req, res) => {
  const { title } = req.params;
  const { value, image } = req.body;

  const cardIndex = cards.findIndex(card => card.title === title);
  if (cardIndex === -1) {
    res.status(404).send('Cartão não encontrado.');
  } else if (!value || !image) {
    res.status(400).send('Dados incompletos. Certifique-se de fornecer valor e imagem.');
  } else {
    cards[cardIndex].value = value;
    cards[cardIndex].image = image;
    res.status(200).json({ card: cards[cardIndex], mensagem: 'Atualizado com sucesso' });
  }
});

app.delete('/cards', async (req, res) => {
  const { id } = req.body;
  cards.splice(id, 1);
  res.status(204).json({ mensagem: 'Código com sucesso' });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
