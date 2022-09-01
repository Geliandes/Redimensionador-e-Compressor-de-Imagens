function resizeImages(){

    const sharp = require('sharp');
    const fs = require('fs/promises');
    const path = require('path');
    const mainApp = require('./app');
    const imageCompressor = require('./compressor');
    const webpCompress = require('./webpCompress');
    let callback = 0;

    fs.readdir(path.join('./files'))
    .then(files => {
        const images = files.filter((file) => true);

        for(let i = 0; i < images.length; i++){

            sharp(input = `./files/${images[i]}`)
            .resize(mainApp.width, mainApp.height, {})
            .toFile('./resized/' + images[i].replace('.jpg','').replace('.png','').replace('.webp', '').replace('.avif','').replace('.gif', '') + `.${mainApp.formato.toLowerCase()}`);

            console.log("\033[0m" + `A imagem ${images[i]}` + "\033[0;32m foi redimensionada com sucesso!" + "\033[40;1;37m");
            callback ++;

            if(callback == images.length){
                console.log("\n\033[42;1;37m--- Redimensionamento concluído, iniciando a compressão das imagens ---" + "\033[40;1;37m\n");
                if(mainApp.formato.toLowerCase() === 'avif'){
                    console.log("\033[0;31mATENÇÃO! Não é possível comprimir imagens do tipo AVIF" + "\033[40;1;37m\n")
                } else{
                    if(mainApp.formato.toLowerCase() === 'webp'){
                        setTimeout(()=>{webpCompress()},2000);
                    } else{
                        setTimeout(()=>{imageCompressor()},2000);
                    }          
                }                
            }
        }
    })
}

module.exports = resizeImages;