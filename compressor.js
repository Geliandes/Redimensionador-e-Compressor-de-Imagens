function imageCompressor() {
    
    const fs = require('fs/promises');
    const path = require('path');
    const compress_images = require('compress-images');
    const mainApp = require('./app');

    function compress(pathInput, outputPath){

        compress_images(pathInput, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
            { jpg: { engine: "mozjpeg", command: ["-quality", `${mainApp.qualidade.toString()}`] } },
            { png: { engine: "pngquant", command: [`--quality=70-${mainApp.qualidade.toString()}`, "-o"] } },
            { svg: { engine: "svgo", command: "--multipass" } },
            { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },

            function (error, completed, statistic) {
                console.log("-------------");
                console.log(error);
                console.log(completed);
                console.log(statistic);
                console.log("-------------");
            }
        )
    }

    fs.readdir(path.join('./resized'))
    .then(files => {
        const images = files.filter((file) => true);
        outputPath = "./compressed/";

        for(let i = 0; i < images.length; i++){
            compress(`resized/${images[i]}`, outputPath);
            console.log("\033[40;1;37m" + `A imagem ${images[i]}` + "\033[0;32m foi comprimida com sucesso!" + "\033[40;1;37m");
        }
    })
}

module.exports = imageCompressor;