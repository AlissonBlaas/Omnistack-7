const Post = require('../models/Post');
const sharp = require('sharp'); // para resize img
const path = require('path');
const fs = require('fs'); //filesystem


module.exports = {
    async index(req, res){
        const posts = await Post.find().sort('-createdAt'); // os maias recentes ficam e m cima
        
        return res.json(posts)
    },

    async store(req, res){
        const {author, place, description, hashtags} = req.body;
        const { filename: image } = req.file;

        const[name] = image.split('.');
        const fileName = `${name}.jpg`;

        await sharp(req.file.path) //redimensiona a imagem para 500px
            //return res.json(req.file) todas as informações
             
            .resize(500)  // resize 500px
            .jpeg({quality: 70}) //quqlidade 70%
            .toFile( //exporta par um novo arquivo
                path.resolve(req.file.destination, 'resizeds', fileName)//resolve para chegar na pasta resize
            );

            fs.unlinkSync(req.file.path); //deleta img do path uploads, arquivo roiginal

        const post = await Post.create({ //await espera até finalizar e posta no banco de dados
            author,
            place,
            description,
            hashtags,
            image: fileName,
        })

        req.io.emit('post', post);//envia uma mensagem com o nome post com todos os dados para io

        return res.json(post);
    }
}