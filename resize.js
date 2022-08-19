function resizeImages(){

    const sharp = require('sharp');
    const fs = require('fs/promises');
    const path = require('path');
    const mainApp = require('./app');
    const imageCompressor = require('./compressor');
    let callback = 0;

    fs.readdir(path.join('./files'))
    .then(files => {
        const images = files.filter((file) => true);

        for(let i = 0; i < images.length; i++){

            sharp(input = `./files/${images[i]}`)
            .resize(mainApp.width, mainApp.height, {})
            .toFile('./resized/' + images[i].replace('.jpg','').replace('.png','').replace('.webp', '').replace('.avif','') + `.${mainApp.formato}`);
            console.log(`A imagem ${images[i]} foi redimensionada com sucesso!`);
            callback ++;

            if(callback == images.length){
                console.log('\n--- Redimensionamento concluído, iniciando a compressão das imagens ---\n');
                imageCompressor();
            }
        }
    })
}

module.exports = resizeImages;