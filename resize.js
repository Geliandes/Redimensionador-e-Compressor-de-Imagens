function resizeImages(){

    const sharp = require('sharp');
    const fs = require('fs/promises');
    const path = require('path');
    const mainApp = require('./app');
    const imageCompressor = require('./compressor');
    const webpCompress = require('./webpCompress')
    let callback = 0;

    fs.readdir(path.join('./files'))
    .then(files => {
        const images = files.filter((file) => true);

        for(let i = 0; i < images.length; i++){

            sharp(input = `./files/${images[i]}`)
            .resize(mainApp.width, mainApp.height, {})
            .toFile('./resized/' + images[i].replace('.jpg','').replace('.png','').replace('.webp', '').replace('.avif','').replace('.gif', '') + `.${mainApp.formato.toLowerCase()}`);

            console.log(`A imagem ${images[i]} foi redimensionada com sucesso!`);
            callback ++;

            if(callback == images.length){
                console.log('\n--- Redimensionamento concluído, iniciando a compressão das imagens ---\n');
                if(mainApp.formato.toLowerCase() === 'avif'){
                    console.log('ATENÇÃO! Não é possível comprimir imagens do tipo AVIF\n')
                } else{
                    if(mainApp.formato.toLowerCase() === 'webp'){
                        setTimeout(()=>{webpCompress()},2000)
                    } else{
                        setTimeout(()=>{imageCompressor()},2000)
                    }          
                }                
            }
        }
    })
}

module.exports = resizeImages;