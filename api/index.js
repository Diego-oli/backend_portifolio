const cors = require('cors');
const express = require('express');
const admin = require("firebase-admin");

const serviceAccount = {
  type: "service_account",
  project_id: "bd-portifas",
  private_key_id: "a437be6ed06010dd8c634d231886f476e88d5989",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCe1ZKlad/POR3N\nJtAdMWsWu7gOaOoI2FKL8Tb1SJ4lFLKki1+ihZj+dwEseRigKXmx5K1KhzUzl1I3\nB+/ghJDjP0LGd5nWbJ2ARbcLVD9bD2ZaMnCXIxKTjLJnswl7Lb6iv4Rj78lc5W5u\nkhLq4A8j7WhexxkrGf+JrQgFPq9XN2tXHYAH+kQEcFbBButcoiRF+U3nO3C8JBZS\nb4E7MU//lYXmMIm3FZM625/dSf9y5UdgyekBQn9W6byEPXzxMJmZcxzx56JMKjPr\nUd+AnAWUlPNbW2SNorRDG468sLuEpIvb0QtV8L8ckjSFi3tWF25fKijUiuLdHB1e\n/r0qmkP/AgMBAAECggEAAJdDNDHtO9EdLXeY5WYbEHrJF+Y60KbO9jRPtwcUVFQv\nLr64YvT9eVAQa6dVRYTblHAJJDJvXgf3FCG607cw7sqvQRvBMVoDSZUSaQyULvUj\nG7zKTG88XdrziVoFWmiOJ/7V/qUt6fzBT2n9stMu9NXb27zNePdf/i9SZoQxx/15\nFHp7yWYbBr6i74a2FWg+z4f3M0KgB4UC2dGxLJs36k7LGB6Bo0//HCu0Il4I5HG5\n7HOj3CEj96F9+SLlUKnouV1Ph5fhiiwq4TbLA8l8Pm4pB26XxgGe0phTs+H73DrU\nqUZhmJZzxzfLKaraPFvvniqieZaZXA2vF9yMMiAw8QKBgQDfS3Hg6UN8Mzr+kmz+\n53vIt9DN6dYgrvz/oWgbbGGs9djGBFajD9OqbtvkaLl5DF0uLwM6schDnCk2IYyM\nQE+/ymoOzpFcn7ngSOfu26JSvO/dzhhLAdE7bgseVQGI/c/OSzQud4aBqHz6VX5L\nRvdcNVz0WR4nQUH+F4fjJYsBFwKBgQC2GSYyq1KUhb/dk5DiCvXTtGeTEso7h1W9\n04e4PNzzIO8mP4Oh9flu0QZXoH0kPmaH5FI4G5rkmzA+vi6uXvMiZPHa/zRSN8WI\n/vN3EhMTvqZILAFciiUGXJKKpVYA809KKNL4aZmHF7V72zEzaDLJLslhnBu5dB1h\nfS73+VAVWQKBgQCU0/M+Bht9z6OVg8D0ERO3D5UzeZTHyfpE467BAHcF0gK+0Kty\nGZ1prmQPlCFy5ePBYYJUf6RMM+xf8PJ9lGvTGDWiUtoeEzPPoqg70tYZMWbqvnAA\npmBvrQPqHpxcU1dLV2KbSf0ztDpAm/UGdXFvWv3uuutXHK7Ajax7oE1K1wKBgQCF\n/vGVvW3R7q2lva2SOCB2fTzuA5iev1J/kcU/9EFeAvEXwwr4xgia2+L/3g/X+Lb3\n7jH2KZIMAIo60TWGiEX/HCrATKTSj0mjKoA7MSiqkdLILuF9mAXwrXQD4+/qWSAS\nYQIFW6dmujKIhl2pB1a/pdb4JahdCi2IjFZgkKu2WQKBgCuxMJ6FfiNSTFwlPksN\ndOmdWVEt8olw52L/FWNBPxjO7iz6Aa2GeCnfytw5jSP9AwGOgMHjg+04Z2x1ZJ9C\ndPONn93qWX+IsKi7fCvXAoAl125UYVocbKz3FkN5zhj9vmwn/F5zZ3fe5LN9bPiU\nYiQrpXQy2BVjOr6r8/yPOEFY\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-riiz9@bd-portifas.iam.gserviceaccount.com",
  client_id: "115570790517393629901",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-riiz9%40bd-portifas.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
const db = admin.firestore();

app.use(cors());
app.use(express.json());

app.get('/cartoes', async (req, res) => {
  try {
    const response = await db.collection('bolso').get();
    const cartoes = response.docs.map(doc => ({
      id: doc.id, ...doc.data(),
    }));
    console.log(cartoes);
    res.status(200).json({ cartoes });
    console.log('Cartões devolvidos com sucesso!');
  } catch (e) {
    console.log(e);
    res.status(500).json({ menssagem: 'Erro ' + e });
    console.log('Erro ao buscar dados' + e);
  }
});

app.post('/cartoes', async (req, res) => {
  const { nome, valor, img } = req.body;
  if (!nome) {
    res.status(400).json({ mensagem: 'Linguagem do cartão inválida!' });
    console.log('Novo cartão não cadastrado, linguagem inválida!');
  } else if (!valor) {
    res.status(400).json({ mensagem: 'valor do cartão inválido!' });
    console.log('Novo cartão não cadastrado, valor inválido!');
  } else if (!img) {
    res.status(400).json({ mensagem: 'Imagem do cartão inválida!' });
    console.log('Novo cartão não cadastrado, imagem inválida!');
  } else {
    try {
      const novoCartaoRef = await db.collection('bolso').add({
        linguagem: nome, //propriedade diferente do valor da variavel
        valor: valor,
        img, //propriedade com mesmo valor da variavel
        criadoEm: admin.firestore.FieldValue.serverTimestamp()
      });
      res.status(201).json({
        mensagem: 'Cartão cadastrado com sucesso!',
        id: novoCartaoRef.id
      });
      console.log('Novo cartão cadastrado com ID:', novoCartaoRef.id);
    } catch (error) {
      console.error('Erro ao cadastrar cartão:', error);
      res.status(500).json({ mensagem: 'Erro ao cadastrar cartão' });
    }
  }
});

app.delete('/cartoes', async (req, res) => {
  const id = req.body.cartao;
  if (!id) {
    res.status(400).json({ mensagem: 'ID do cartão não fornecido' });
    console.log('ID do cartão não fornecido');
  } else {
    try {
      const cartaoRef = db.collection('bolso').doc(id);
      const doc = await cartaoRef.get();
      if (!doc.exists) {
        res.status(404).json({
          mensagem: 'Cartão com ID '
            + cartao + ' não encontrado'
        });
        console.log('Cartão não encontrado');
      } else {
        await cartaoRef.delete();
        res.status(200).json({
          mensagem: 'Cartão com ID '
            + cartao + ' deletado'
        });
        console.log('Cartão com ID ' + cartao + ' deletado');
      }
    } catch (e) {
      console.error('Erro ao deletar cartão:', e);
      res.status(500).json({ mensagem: 'Erro ao deletar cartão' });
    }
  }
});

app.put('/cartoes', async (req, res) => {
  const { linguagem, valor, img, id } = req.body;
  if (!id) {
    res.status(400).json({ mensagem: 'ID do cartão não fornecido' });
    console.log('Cartão não atualizado, ID inválido.');
  } else {
    try {
      const cartaoRef = db.collection('bolso').doc(id);
      const doc = await cartaoRef.get();
      if (!doc.exists) {
        res.status(404).json({
          mensagem: 'Cartão com ID '
            + id + ' não encontrado'
        });
        console.log('Cartão não encontrado');
      } else {
        const dadosAtualizados = {};
        if (linguagem) dadosAtualizados.linguagem = linguagem;
        if (valor) dadosAtualizados.valor = valor;
        if (img) dadosAtualizados.img = img;
        await cartaoRef.update(dadosAtualizados);
        res.status(200).json({
          mensagem: 'Cartão com ID '
            + id + ' atualizado'
        });
        console.log('Cartão com ID ' + id + ' atualizado');
      }
    } catch (error) {
      console.error('Erro ao atualizar cartão:', error);
      res.status(500).json({ mensagem: 'Erro ao atualizar cartão' });
    }
  }
});

module.exports = app;
  