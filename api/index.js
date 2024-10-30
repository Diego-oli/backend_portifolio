const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const admin = require("firebase-admin");
const serviceAccount = {
  type: "service_account",
  project_id: "bd-portifas",
  private_key_id: "2ca962a170df95fb6ce9995ba60761a9f4cd9be1",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCvsMtRon53kxWI\nd7/Q4kAS0/TpknkppYdbdP24YPpsTi296mWxkYIHXDq90S+jeHR86xwuDgZZ5G51\nieq97Q9yWdoqRb+rKXSk9hUdBNDX7v81dz+/cTJhHDhCP93in33p/KbQFzlJhvG8\n49LFJuGrBBJb+iLPdvSy/B4SDQ2ab/GpYmaisX/ppwSFXdrSmuOXeSgwmjSkJi79\n4AKFPf0pKDmrgnSbk2MVH6MVbSUkKYymfO6rV7uw3rydljS+rExy+3/XzXEI4Nnd\nb6m2x3qU1MkkS4VYJp3NukT2/rKmZHJstqa382xjEImJUG8kWbPXpojTq36mFiB9\nwa15DFR/AgMBAAECggEAFs1kLhBgHUaGj8OJro4sJmVtDthBsnvh2/xh+7QBJzJk\nXGxCI5rmMeywpmHdLs3GQfpFGjMcHumiGSORHHJamWBRC5XUNl5MiHvJ1LjYdCt4\nOGkQPy7Ct6OGfQ61+SDzIih2QWFqQCvr+bSQmUxJE2hAC8D6E0wgno77RiN8kFO0\n82lwGKVvWqJ+yIdwM+/+Nu3wUj3sF0TM+rXkNXuqgCO+Wt/Kr9WL5rrEOMFximBE\nCkUPtNxQntlarfFpKugCvhNRala/skEw5yo9yYMs80yaTsej1ysfv8SCbL2Ogndi\nW9jghw9Q8tND9F4+8xn4f4nm1tBeNyBsvUu4RiHBeQKBgQDiGOOXSLLi9CBootTU\nHAyoCO24keaJmLCoc3XgWRJoVeAbdZJqz/kOu+6rIeJ6xsp5fOIYei1CA3rWiHKK\nxem4Va6ef9Qr07pksUl0Wjk5E61RWIs2XmYk8m+u2wd7UngrjWKuRZtzgssUc4YU\ncfLv/uE3f/fz9VYdV0Kt8ggQpwKBgQDG7UH0H11dC8g1MXfNw2f4QyRfEPAK8CTx\ng9zCo3A30QCFvu4CiHwLeavBdw9/6xlT3W5qC76jarnlIW5kNl+PXI6uvalXefSR\nM71IH9id255+SlSocIz+YVIN/jr8rZmiwazlVPqLvC8AaPzP9uEmxTDQEaWyPjjF\nPoeebIaAaQKBgDolGHKReZ+wFJ2UMpOR2xdjpG7w5o7AO742Yzwc7AT1ALtPEyZw\n8aX+YrST9ECK2ws/OI3+7aCqcG63jG1v1FlZf5y3VwMmYir/BNrtUQYCr3HaCYMj\n57TcvCgFn/jxDoJ0y8nxkLa2Di/mPbcITue1bontWQDeORU2malOMxDFAoGBAJAa\nQSPKMMT9ivvVqPbarg9u/AMN7wXNbsWyAxLQeLNGaP16EUquekWJzz0ntYex1Dgn\neRvDBEe3QZDVhfV8Wf8tSoMVC34970fcVirQPwgjlw3fZLJcThbcgyd12l8+lsQL\nTucWhyUAnn/KjhFMw09lm3Wuwvx7DH7+TBocfda5AoGAMkBDtrdZbvRUBX1lj0ni\n7Gi24W2HPRfVAz7iJQq005nGPSGAmO6Qk03bbNUvt2Ue+acEDpmLoloa0GrXpnAs\n+qh7cqAJdBAj90MeZ7wkmHo694NGiq41BK1Dm3Gxjc/1V7QT1R5JayrAwi34iF9V\n9n64ALXgpOOZvUWh4OB0jx8=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-riiz9@bd-portifas.iam.gserviceaccount.com",
  client_id: "115570790517393629901",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-riiz9%40bd-portifas.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
}



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(cors());
app.use(express.json());

// let cards = [
//   { title: ' Cartão boso ', value: 'R$ 150,00', image: 'https://hashtag.blogfolha.uol.com.br/files/2021/01/Eq-RgudXMAA3CnO.jpg' },
//   { title: 'Cartão bosonario', value: 'R$ 300,00', image: 'https://hashtag.blogfolha.uol.com.br/files/2021/01/Eq-RgudXMAA3CnO.jpg' },
//   { title: 'Cartão bolsonaro', value: 'R$ 500,00', image: 'https://hashtag.blogfolha.uol.com.br/files/2021/01/Eq-RgudXMAA3CnO.jpg' },
//   { title: 'Cartão lula', value: 'R$ 200,00', image: 'https://hashtag.blogfolha.uol.com.br/files/2021/01/Eq-RgudXMAA3CnO.jpg' },

// ];

app.get('/cards', async (req, res) => {
  try {
      const response = await bd.collection('cards').get();
      const cards = response.docs.map(doc => ({
          id: doc.id, ...doc.data(),
      }));
      console.log(cards);
      res.status(200).json({ cards });x
      console.log('Cartões devolvidos com sucesso!');
  } catch (e) {
      console.log(e);
      res.status(500).json({menssagem: 'Erro ' + e });
      console.log('Erro ao buscar dados' + e);
  }
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