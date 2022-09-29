function convertImages() {
	const imageCompressor = require('./compressor');
	const webpCompress = require('./webpCompress');
	const resizeImages = require('./resize')
	const mainApp = require('./app');
	const path = require('path');
	const fs = require('fs/promises');
	const sharp = require('sharp')
	let callback = 0;

	fs.readdir(path.join('./files'))
		.then(files => {

			const images = files.filter((file) => true);

			for (let i = 0; i < images.length; i++) {
				sharp(`./files/${images[i]}`)
					.toFormat(mainApp.formato.toLowerCase(), { quality: 100 })
					.toFile('./converted/' + `${images[i]}`.replace('.jpg', '').replace('.png', '').replace('.webp', '').replace('.avif', '').replace('.gif', '') + `.${mainApp.formato.toLowerCase()}`)

				console.log("\033[0m" + `A imagem ${images[i]}` + "\033[0;32m foi convertida com sucesso!" + "\033[40;1;37m");

				callback++

				if (callback == images.length) {
					if (mainApp.width == null && mainApp.height == null) {
						console.log("\n\033[42;1;37m--- Conversão concluída, iniciando a compressão das imagens ---" + "\033[40;1;37m\n");
						if (mainApp.formato.toLowerCase() === 'avif') {
							console.log("\033[0;31mATENÇÃO! Não é possível comprimir imagens do tipo AVIF" + "\033[40;1;37m\n")
						} else {
							if (mainApp.formato.toLowerCase() === 'webp') {
								setTimeout(() => {
									webpCompress()
								}, 2000);
							} else {
								setTimeout(() => {
									imageCompressor()
								}, 2000);
							}
						}
					} else {
						console.log("\n\033[42;1;37m--- Conversão concluída, iniciando o redimensionamento das imagens ---" + "\033[40;1;37m\n");
						setTimeout(() => {
							resizeImages()
						}, 2000);
					}
				}
			}
		}
    )
}

module.exports = convertImages;