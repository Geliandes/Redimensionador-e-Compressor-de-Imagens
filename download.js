function downloadImages(){
    const textoFinal = require('./listaDeLinks');
    const fs = require('fs');
    const https = require('https');
    const texto = require('./listaDeLinks')
  
    // URL da imagem
    let url = textoFinal.arrayDeLinks

    // Regex para pegar o mesmo nome da imagem
    const regex = new RegExp("\/([^/]*)$")

    for(let i = 0; i < url.length; i++){
        https.get(url[i],(res) => {

            let urlRegex = url[i].match(regex)[1]
            let fileName = "img.jpg"

            if(urlRegex !== undefined){
                fileName = urlRegex;
            }

            const path = `${__dirname}/files/${fileName}`; 
            const filePath = fs.createWriteStream(path);
            res.pipe(filePath);
            filePath.on('finish',() => {
                filePath.close();
                console.log(`Download da imagem ${fileName} concluído`); 
            })
        })
    }
}

module.exports = downloadImages