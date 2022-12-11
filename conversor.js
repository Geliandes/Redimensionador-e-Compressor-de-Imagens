function convertImages() {
	const imageCompressor = require('./compressor');
	const webpCompress = require('./webpCompress');
	const resizeImages = require('./resize')
	const mainApp = require('./app');
	const textoFinal = require('./execute');
	const path = require('path');
	const fsp = require('fs/promises');
	const fs = require('fs')
	const sharp = require('sharp')

	let url = textoFinal.arrayDeLinks;
	const regex = new RegExp("\/([^/]*)$");

	fsp.readdir(path.join('./files'))
		.then(files => {
			let callback = 0;
			const images = files.filter((file) => true);

			for (let i = 0; i < images.length; i++) {
				sharp(`./files/${images[i]}`)
					.toFormat(mainApp.formato.toLowerCase(), {
						quality: mainApp.qualidadeDaConversao
					})
					.toFile('./converted/' + `${images[i]}`.replace('.jpg', '').replace('.png', '').replace('.webp', '').replace('.avif', '').replace('.gif', '') + `.${mainApp.formato.toLowerCase()}`)

				console.log("\033[0m" + `A imagem ${images[i]}` + "\033[0;32m foi convertida com sucesso!" + "\033[40;1;37m");

				callback++
			}
			
			if (callback == images.length) {
				interval()
			}
		})

	function interval() {

		console.log('\n> Verificando se o arquivo existe');

		let filesExist = 0;

		var meuInterval = setInterval(function() {

			for (let i = 0; i < url.length; i++) {
				let urlRegex = url[i].match(regex)[1]

				let fileName = "img.jpg";

				if (urlRegex !== undefined) {
					fileName = urlRegex.replace('.jpg', '').replace('.png', '').replace('.webp', '').replace('.avif', '').replace('.gif', '') + `.${mainApp.formato.toLowerCase()}`;
				}

				const path = `${__dirname}/converted/${fileName}`;

				fs.access(path, fs.constants.F_OK, (err) => {

					if (err) {
					} else {
						filesExist++;
					}
				})
			}

			if(filesExist == url.length){
				callback(true)
				clearInterval(meuInterval);
			}
		}, 1000)
	}

	function callback(situation) {
		if (situation == true) {
			
			if (mainApp.width == null && mainApp.height == null) {
				console.log("\n\033[42;1;37m--- Conversão concluída, iniciando a compressão das imagens ---" + "\033[40;1;37m\n");
				if (mainApp.formato.toLowerCase() === 'avif') {
					console.log("\033[0;31mATENÇÃO! Não é possível comprimir imagens do tipo AVIF" + "\033[40;1;37m\n")
				} else {
					if (mainApp.formato.toLowerCase() === 'webp') {
						webpCompress()
					} else {
						imageCompressor()
					}
				}
			} else {
				console.log("\n\033[42;1;37m--- Conversão concluída, iniciando o redimensionamento das imagens ---" + "\033[40;1;37m\n");
				resizeImages()
			}
		}
	}
}

module.exports = convertImages;