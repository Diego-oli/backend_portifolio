const cors = require('cors');
const express = require('express');

const app = express();
const porta = 3000;

app.use(cors());
app.use(express.json());

let cartoes = [
    {
        nome: 'Tenis Barcelona',
        valor: 'R$59.70',
        img: "https://th.bing.com/th/id/R.720c0e20b9a11f1849c7c7c87b373437?rik=gcjvH6x1SapnLw&pid=ImgRaw&r=0"
    },
    {
        nome: 'CARTAO 2',
        valor: 'R$90.23',
        img: "https://th.bing.com/th/id/OIP.zZcHBkUfwUmtek-sWpnjaAHaHa?w=1200&h=1200&rs=1&pid=ImgDetMain"
    },
    {
        nome: 'CARTAO 3',
        valor: 'R$27.79',
        img: "https://th.bing.com/th/id/OIP.9kvRZ7zLIEE2umY0x-g9QwHaHa?w=544&h=544&rs=1&pid=ImgDetMain"
    },
    {
        nome: 'CARTAO 4',
        valor: 'R$86.49',
        img: "https://cdnv2.moovin.com.br/sandycalcados/imagens/produtos/original/tenis-nike-flyknit-max-85e744676043564192c692461cdb747f.jpg"
    },
    {
        nome: 'CARTAO 5',
        valor: 'R$11.55',
        img: "https://th.bing.com/th/id/OIP.Oe1oRos3_P7NZW5k8A6VqAAAAA?w=474&h=474&rs=1&pid=ImgDetMain"
    },
    {
        nome: 'CARTAO 6',
        valor: 'R$33.77',
        img: "https://th.bing.com/th/id/OIP.X7wo2DnEcRJdI9oMPh2RMQHaHa?w=650&h=650&rs=1&pid=ImgDetMain0"
    },
    {
        nome: 'CARTAO 7',
        valor: 'R$12.36',
        img: "https://th.bing.com/th/id/OIP.oru-V2rGQt6PTXXuh2qFDgHaIq?w=850&h=995&rs=1&pid=ImgDetMain"
    },
    {
        nome: 'CARTAO 8',
        valor: 'R$38.80',
        img: "https://th.bing.com/th/id/OIP.mODcPB1d4wGyUkxwD63-yQHaHa?w=2000&h=2000&rs=1&pid=ImgDetMain"
    },
    {
        nome: 'CARTAO 9',
        valor: 'R$14.87',
        img: "https://th.bing.com/th/id/OIP.O5S1ytIVLkSa8ZuqsNOongHaHa?rs=1&pid=ImgDetMain"
    },
    {
        nome: 'CARTAO 10',
        valor: 'R$53.40',
        img: "https://th.bing.com/th/id/OIP.O5S1ytIVLkSa8ZuqsNOongHaHa?rs=1&pid=ImgDetMain"
    }
];


app.get('/cartoes', (req, res) => {
    res.status(200).json({ cartoes });
    console.log('Cartões devolvidos com sucesso!');
});

app.post('/cartoes', (req, res) => {
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
        cartoes.push({ nome: nome, valor: valor, img: img });
        res.status(201).json({ mensagem: 'Cartão cadastrado com sucesso!!' });
        console.log('Novo cartão cadastrado!');
    }
});

app.delete('/cartoes', (req, res) => {
    const { cartao } = req.body;

    if (!cartao || cartao < 0 || cartao > cartoes.length) {
        res.status(400).json({ mensagem: 'Cartão ' + cartao + ' não encontrado' });
        console.log('Cartão não deletado');
    } else {
        cartoes.splice(cartao, 1);
        res.status(201).json({ mensagem: 'Cartão ' + cartao + ' deletado' });
        console.log('Cartão ' + cartao + ' deletado');
    }

});

app.put('/cartoes', (req, res) => {
    const { nome, valor, img, id } = req.body;
    if (!id || id < 0 || id > cartoes.length) {
        res.status(400).json({ mensagem: 'Cartão ' + id + ' não encontrado' });
        console.log('Cartão não atualizado, id invalido.');

    } else {
        if (nome == null || nome === '') {
            nome = cartoes[id].nome;
        } 
        if (valor == null || valor === '' || isNaN(valor)) {
            valor = cartoes[id].valor;
        } 
        if (img == null || img === '') {
            img = cartoes[id].img;
        }
        cartoes[id] = { nome: nome, valor: valor, img: img };
        res.status(201).json({ mensagem: 'Cartão ' + id + ' atualizado' });
        console.log('Cartão ' + id + ' atualizado');
    }
});

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
