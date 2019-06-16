const multer = require('multer');
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({ //salvar imagem no disco
        destination: path.resolve(__dirname, '..', '..', 'uploads' ), //diretorio para salvar imagem
        filename: function (req, file, cb){
            cb(null, file.originalname);
        }
    })
}