// INSTRUÇÕES DE USO:
// Insira os links das imagens a serem redimensionadas no arquivo "insercao de links.txt", os links devem ser separados por vírgula

// Após inserir o link das imagens no documento de texto, execute o comando "npm install" no terminal do Visual Studio Code para instalar todas as dependências

// Com as dependências instaladas, execute o comando "node app" para executar o redimensionamento e compressao

 // OBS. Não esqueça de configurar a resolução desejada abaixo

const downloadImages = require('./download');
const resizeImages = require('./resize')
const imageCompressor = require('./compressor')

const mainApp = {

    // Digite a largura da imagem em pxa
    width: 1200,

    // Digite a altura da imagem em pc
    height: null,

    // Insira o formato de saída (JPG, PNG, AVIF, WEBP, SVG ou GIF)
    formato: 'jpg',

    // Digite o valor para a qualidade da imagem a ser comprimida (Obs. Apenas funciona para os formatos JPG, PNG, GIF ou SVG)
    qualidade: 85
}

module.exports = mainApp

downloadImages();

setTimeout(()=>{resizeImages();}, 10000)

setTimeout(()=>{imageCompressor()}, 11000)