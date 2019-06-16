const express = require('express');
const mongoose = require('mongoose');
const path  = require('path');
const cors = require('cors'); //linkar usando dominios diferentes no node

const app = express();

const server = require('http').Server(app);//protoclo http
const io = require('socket.io')(server); //requisiões websocket

mongoose.connect('mongodb+srv://rato:123@cluster0-je7do.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
});

app.use((req, res, next)=>{ //next garante que tudo seja executdo e as outras rotas sejam executados tbm
    req.io = io;

    next();
})

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resizeds')));

app.use(require('./routes'));

server.listen(8888);


//index ponto de entrada da aplicação, importa as dependencias e faz a conexao com banco de dados e divide o server que suporte protocolo http e websocket em tempo real
//repassa o io em real time para todas as rotas, dentro de todos os controles
//cors para permitir que todas as urls acessam o backend