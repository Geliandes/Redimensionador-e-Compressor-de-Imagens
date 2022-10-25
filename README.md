# Redimensionador e Compressor de Imagens

#### O objetivo desse programa criado em Node.JS é possibilitar o redimensionamento e compressão de imagens em massa através dos links da imagens na internet. A execução ocorre da seguinte forma:
1. Download das imagens;
2. Redimensionamento das imagens de acordo com as configurações feitas no arquivo app.js;
3. Compressão das imagens (Formatos suportados: JPG, PNG e WEBP).

PS. Ainda não foi integrado suporte para compressão de AVIF, porém o redimensionamento para imagens AVIF funciona normalmente.

## Requisitos
- É necessário que o Node.js esteja instalado em seu computador para que o programa funcione, caso não tenha, você pode baixa-lo através deste [link](https://nodejs.org/en/download/).

## Instruções de uso

- Após baixar os arquivos abra a pasta do programa no Visual Studio Code e execute o comando **npm install** para instalar todas as dependências do programa (pacotes de redimensionamento e compressão);
- No arquivo de texto **insecao de links**, devem ser colocados o/os link(s) das imagens que você deseja redimensionar (os links devem ser seperados por vírgula);
- Após preencher o arquivo de texto com os links, execute o comando **node app** no terminal do programa para executar;
- Após a execução, serão criadas 3 pastas, "files", "resized" e "compressed". Em files serão armazenadas as imagens originais, em resized as imagens redimensionadas e em compressed as imagens redimensionadas em comprimidas.

## Estrutura das pastas
- files = imagens originais baixadas
- conversed = imagem original convertida para o formato selecionado
- resized = imagem convertida para o formato selecionado e redimensionada para a dimensão especificada
- compressed = imagem convertida para o formato selecionado, redimensionada para a dimensão especificada e convertida para o valor especificado

## Comandos
**Os comandos devem ser executado no terminal do Visual Studio Code**

**Instalar dependências**
```
npm install
```

**Iniciar programa**
```
node app
```

##### Observação Este é um programa criado para fins estudantis, utilizando os seguintes pacotes: **gifsicle**, **pngquant-bin**, **sharp**, **compress-images** e **Jimp**.

Sintam-se à vontade para fazer commits que possam melhorar o programa :)
