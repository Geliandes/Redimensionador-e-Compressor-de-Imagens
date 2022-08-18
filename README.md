# Redimensionador e Compressor de Imagens

#### O objetivo desse programa criado em Node.JS é possibilitar o redimensionamento e compressão de imagens em massa através dos links da imagens na internet. A execução ocorre da seguinte forma:
1. Download das imagens;
2. Redimensionamento das imagens de acordo com as configurações feitas no arquivo app.js;
3. Compressão das imagens (Obs. Ainda não foi atribuído um pacote para compressão de imagens WebP).

##### Observação Este é um programa criado para fins estudantis, utilizando os seguintes pacotes: **gifsicle**, **pngquant-bin**, **sharp** e **compress-images**.

## Instruções de uso

- Após baixar os arquivos, execute primeiramente o arquivo **cirar-pastas**, ele vai criar as pastas necessárias no mesmo diretório para o funcionamento do programa;
- Abra o arquivo **app.js** com o Visual Studio Code e execute o comando **npm install** para instalar todas as dependências do programa (pacotes de redimensionamento e compressão);
- No arquivo de texto **insecao de links**, devem ser colocados o/os link(s) das imagens que você deseja redimensionar (os links devem ser seperados por vírgula);
- Após preencher o arquivo de texto com os links, execute o comando **node app** no terminal do programa para executar.

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

Sintam-se à vontade para fazer commits que possam melhorar o programa :)
