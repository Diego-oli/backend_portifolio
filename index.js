const cors = require('cors');
const express = require('express');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

let cards = [
    {
        nome: 'bolso biber',
        valor: 'R$59.70',
        img: "https://hashtag.blogfolha.uol.com.br/files/2021/01/Eq-RgudXMAA3CnO.jpg"
    },
    {
        nome: 'bolso biber 2',
        valor: 'R$90.23',
        img: "https://hashtag.blogfolha.uol.com.br/files/2021/01/Eq-RgudXMAA3CnO.jpg"
    },
    {
        nome: 'bolso biber 3',
        valor: 'R$27.79',
        img: "https://hashtag.blogfolha.uol.com.br/files/2021/01/Eq-RgudXMAA3CnO.jpg"
    },
    {
        nome: 'bolso biber 4',
        valor: 'R$86.49',
        img: "https://hashtag.blogfolha.uol.com.br/files/2021/01/Eq-RgudXMAA3CnO.jpg"
    },
    {
        nome: 'bolso biber 5',
        valor: 'R$11.55',
        img: "https://hashtag.blogfolha.uol.com.br/files/2021/01/Eq-RgudXMAA3CnO.jpg"
    },
    {
        nome: 'bolso biber 6',
        valor: 'R$33.77',
        img: "https://hashtag.blogfolha.uol.com.br/files/2021/01/Eq-RgudXMAA3CnO.jpg"
    },
    {
        nome: 'bolso biber 7',
        valor: 'R$12.36',
        img: "https://hashtag.blogfolha.uol.com.br/files/2021/01/Eq-RgudXMAA3CnO.jpg"
    },
    {
        nome: 'bolso biber 8',
        valor: 'R$38.80',
        img: "https://hashtag.blogfolha.uol.com.br/files/2021/01/Eq-RgudXMAA3CnO.jpg"
    },
    {
        nome: 'bolso biber 9',
        valor: 'R$14.87',
        img: "https://hashtag.blogfolha.uol.com.br/files/2021/01/Eq-RgudXMAA3CnO.jpg"
    },
    {
        nome: 'bolso biber 10',
        valor: 'R$53.40',
        img: "https://hashtag.blogfolha.uol.com.br/files/2021/01/Eq-RgudXMAA3CnO.jpg"
    }
];


app.get('/cards', (req, res) => {
    res.status(200).json({ cards });
    console.log('Cartões devolvidos com sucesso!');
});

app.post('/cards', (req, res) => {
    const { nome, valor, img } = req.body;

    if (nome == null || nome === '') {
        res.status(400).json({ mensagem: 'Nome do cartão invalido!' });
        console.log('Novo cartão não cadastrado, nome invalido!');

    } else if (valor == null || valor === '' || isNaN(valor)) {
        res.status(400).json({ mensagem: 'Valor do cartão invalido!' });
        console.log('Novo cartão não cadastrado, valor invalidao');

    } else if (img == null || img === '') {
        res.status(400).json({ mensagem: 'Imagem do cartão invalido!' });
        console.log('Novo cartão não cadastrado, imagem invalida');

    } else {
        cards.push({ nome: nome, valor: valor, img: img });
        res.status(201).json({ mensagem: 'Cartão cadastrado com sucesso!!' });
        console.log('Novo cartão cadastrado!');
    }
});

app.delete('/cards', (req, res) => {
    const { cartao } = req.body;

    if (!cartao || cartao < 0 || cartao > cards.length) {
        res.status(400).json({ mensagem: 'Cartão ' + cartao + ' não encontrado' });
        console.log('Cartão não deletado');
    } else {
        cards.splice(cartao, 1);
        res.status(201).json({ mensagem: 'Cartão ' + cartao + ' deletado' });
        console.log('Cartão ' + cartao + ' deletado');
    }

});

app.put('/cards', (req, res) => {
    const { nome, valor, img, id } = req.body;
    if (!id || id < 0 || id > cards.length) {
        res.status(400).json({ mensagem: 'Cartão ' + id + ' não encontrado' });
        console.log('Cartão não atualizado, id invalido.');

    } else {
        if (nome == null || nome === '') {
            nome = cards[id].nome;
        }
        if (valor == null || valor === '' || isNaN(valor)) {
            valor = cards[id].valor;
        }
        if (img == null || img === '') {
            img = cards[id].img;
        }
        cards[id] = { nome: nome, valor: valor, img: img };
        res.status(201).json({ mensagem: 'Cartão ' + id + ' atualizado' });
        console.log('Cartão ' + id + ' atualizado');
    }
});

//Controle de Login V

app.use(bodyParser.json());

const users = [];

const JWT_SECRET = 'sua_chave_secreta';

app.post('/register', async (req, res) => {
    const { newUsername, newPassword } = req.body;

    const userExists = users.find(user => user.username === newUsername);
    if (userExists) {
        return res.status(400).json({ message: 'Usuário já existe.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    users.push({ username: newUsername, password: hashedPassword });
    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Usuário ou senha inválidos.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Usuário ou senha inválidos.' });
    }

    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
