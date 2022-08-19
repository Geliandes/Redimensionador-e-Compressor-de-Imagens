const downloadImages = require('./download')

function execute(){

    var fs = require('fs');
    var array = fs.readFileSync('insercao de links.txt').toString().replace(/(\r\n|\n|\r)/gm, "").split(",");
    let dir = "./files";
    
    //Verifica se não existe
    if (!fs.existsSync(dir)){
        //Efetua a criação do diretório
        fs.mkdirSync(dir);
    }

    dir = "./resized";
    //Verifica se não existe
    if (!fs.existsSync(dir)){
        //Efetua a criação do diretório
        fs.mkdirSync(dir);
    }

    dir = "./compressed";
    //Verifica se não existe
    if (!fs.existsSync(dir)){
        //Efetua a criação do diretório
        fs.mkdirSync(dir);
    }

    const textoFinal = {
        arrayDeLinks: array
    }

    console.log(textoFinal.arrayDeLinks);

    module.exports = textoFinal;

    downloadImages();
}

module.exports = execute;