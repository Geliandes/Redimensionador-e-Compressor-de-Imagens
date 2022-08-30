function webpCompress(){

    const sharp = require('sharp');
    const fs = require('fs/promises');
    const path = require('path');
    const mainApp = require('./app');
    
    fs.readdir(path.join('./files'))
    .then(files => {
        const images = files.filter((file) => true);

        for(let i = 0; i < images.length; i++){
            sharp(input = `./resized/${images[i]}`)
            .webp({quality: mainApp.qualidade})
            .toFile('./compressed/' + images[i].toString(), (err, info) =>{
                if(err){
                    console.log(`Não foi possível comprimir a imagem ${images[i]}`)
                } else{
                    console.log(`A imagem ${images[i]} foi comprimida com sucesso!`);
                }
            });
        }
    })
}

module.exports = webpCompress;