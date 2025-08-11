const express = require('express');
const { readData, writeData } = require('./utils');

const app = express();
const PORT = 3000;

// middleware para processar JSON
app.use(express.json());

// implementação do cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// lista todos os filmes/séries
app.get('/filmes', (req, res) => {
    const filmes = readData();
    res.json(filmes);
});

// cadastro de filme ou série
app.post('/filmes', (req, res) => {
    const filmes = readData();
    const novoFilme = {
        id: filmes.length > 0 ? Math.max(...filmes.map(f => f.id)) + 1 : 1,
        titulo: req.body.titulo,
        genero: req.body.genero,
        descricao: req.body.descricao,
        imagem: req.body.imagem,
        gostei: 0,
        naoGostei: 0
    };
    filmes.push(novoFilme);
    writeData(filmes);
    res.status(201).json(novoFilme);
});

// resgistra o gostei ou não gostei
app.post('/filmes/:id/votar', (req, res) => {
    const id = parseInt(req.params.id);
    const { tipoVoto } = req.body;
    const filmes = readData();

    const filme = filmes.find(f => f.id === id);

    if (!filme) {
        return res.status(404).json({ mensagem: 'Filme não encontrado' });
    }

    if (tipoVoto === 'gostei') {
        filme.gostei += 1;
    } else if (tipoVoto === 'naoGostei') {
        filme.naoGostei += 1;
    } else {
        return res.status(400).json({ mensagem: 'Tipo de voto inválido' });
    }

    writeData(filmes);
    res.json(filme);
});

// exibição do total de votos
app.get('/totais', (req, res) => {
    const filmes = readData();
    const totalGostei = filmes.reduce((acc, curr) => acc + curr.gostei, 0);
    const totalNaoGostei = filmes.reduce((acc, curr) => acc + curr.naoGostei, 0);
    res.json({
        totalGostei,
        totalNaoGostei
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});