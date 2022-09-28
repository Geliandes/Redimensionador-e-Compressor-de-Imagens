function resizeImages(){
    const fs = require('fs/promises');
    const path = require('path');
    const mainApp = require('./app');
    const imageCompressor = require('./compressor');
    const webpCompress = require('./webpCompress');
    const jimp = require('jimp');
    let callback = 0;

    fs.readdir(path.join('./converted'))
    .then(files => {
        const images = files.filter((file) => true);

        let height = mainApp.height;
        let width = mainApp.width;

        height == null ? height = jimp.AUTO : height = mainApp.height
        width == null ? width = jimp.AUTO : width = mainApp.width

        for(let i = 0; i < images.length; i++){

            async function main() {
                // Read the image.
                const image = await jimp.read(`converted/${images[i]}`);

                // Resize the image to width 150 and auto height.
                image.resize(width, height)
                .writeAsync(`resized/${images[i]}`);
            }
            
            main();

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