const execute = require('./execute');

// INSTRUÇÕES DE USO:

// Insira os links das imagens a serem redimensionadas no arquivo "insercao de links.txt" (os links devem ser separados por vírgula e não devem conter parametrizações, devem ser terminadas com o formato da imagem, example.com.br/image.JPG)

// Após inserir o link das imagens no documento de texto, execute o comando "npm install" no terminal do Visual Studio Code para instalar todas as dependências

// Com as dependências instaladas, execute o comando "node app" para executar o redimensionamento e compressao

// OBS. Não esqueça de configurar a resolução desejada abaixo

const mainApp = {

    // Digite a largura da imagem em px ()
    width: null,

    // Digite a altura da imagem em pc
    height: null,

    // Insira o formato de saída (JPG, PNG, AVIF ou WEBP )
    formato: 'avif',

    // Digite um valor para a qualidade da imagem a ser comprimida (0 a 100)
    qualidade: 85
}

module.exports = mainApp;

execute();