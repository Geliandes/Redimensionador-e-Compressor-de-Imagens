const execute = require('./execute');

// INSTRUÇÕES DE USO:

// Insira os links das imagens a serem redimensionadas no arquivo "insercao de links.txt" (os links devem ser separados por vírgula e não devem conter parametrizações, devem ser terminadas com o formato da imagem, example.com.br/image.JPG)

// Após inserir o link das imagens no documento de texto, execute o comando "npm install" no terminal do Visual Studio Code para instalar todas as dependências

// Com as dependências instaladas, execute o comando "node app" para executar o redimensionamento e compressao

// OBS. Não esqueça de configurar a resolução desejada abaixo

const mainApp = {

    // Caso queira manter as proporções da imagem, basta deixar o width ou o height como "null". Caso não queira redimensionar a imagem, basta deixar tanto o width quanto o height como "null"

    // Digite a largura da imagem em px
    width: 1080,

    // Digite a altura da imagem em pc
    height: null,

    // Insira o formato de saída (JPG, PNG, AVIF ou WEBP)
    formato: 'jpg',

    // Digite um valor para a qualidade da imagem a ser comprimida (0 a 100). Recomendo um valor acima de 70
    qualidade: 85,

    // Digite um valor para a qualidade da imagem a ser convertida (0 a 100) - Valor padrão: 100
    qualidadeDaConversao: 100
}

module.exports = mainApp;

execute();