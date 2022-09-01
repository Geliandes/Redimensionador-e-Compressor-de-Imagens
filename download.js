function downloadImages(){
    
    const textoFinal = require('./execute');
    const fs = require('fs');
    const https = require('https');
    const resizeImages = require('./resize')
  
    // URL da imagem
    let url = textoFinal.arrayDeLinks;

    // Regex para pegar o mesmo nome da imagem
    const regex = new RegExp("\/([^/]*)$");

    let callback = 0;

    for(let i = 0; i < url.length; i++){

        https.get(url[i],(res) => {

            let urlRegex = url[i].match(regex)[1]
            let fileName = "img.jpg";

            if(urlRegex !== undefined){
                fileName = urlRegex;
            }

            const path = `${__dirname}/files/${fileName}`; 
            const filePath = fs.createWriteStream(path);
            res.pipe(filePath);
            filePath.on('finish',(err) => {
                filePath.close();
                console.log("\033[0m" + `Download da imagem ${fileName}` + "\033[0;32m concluído"); 
                callback ++;

                if(callback == url.length){
                    console.log("\n\033[42;1;37m--- Downloads concluídos, iniciando o redimensionamento das imagens ---" + "\033[40;1;37m\n");
                    setTimeout(()=>{resizeImages()},2000);
                }
            })
        })
    }
}

module.exports = downloadImages;