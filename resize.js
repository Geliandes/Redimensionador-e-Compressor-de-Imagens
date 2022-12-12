function resizeImages() {
	const mainApp = require('./app');
	const imageCompressor = require('./compressor');
	const webpCompress = require('./webpCompress');
	const textoFinal = require('./execute');

	const fsp = require('fs/promises');
	const fs = require('fs');
	const path = require('path');
	const jimp = require('jimp');
	const sharp = require('sharp');

	let url = textoFinal.arrayDeLinks;

	const regex = new RegExp("\/([^/]*)$");

	let callbackImg = 0;

	fsp.readdir(path.join('./converted'))
		.then(files => {

			const images = files.filter((file) => true);

			let height = mainApp.height;
			let width = mainApp.width;

			height == null ? height = jimp.AUTO : height = mainApp.height;
			width == null ? width = jimp.AUTO : width = mainApp.width;

			for (let i = 0; i < images.length; i++) {

				async function main() {
					const image = await jimp.read(`converted/${images[i]}`, (err, data) => {
						if (err) {
							sharp(input = `converted/${images[i]}`)
								.resize(mainApp.width, mainApp.height)
								.toFile('./resized/' + images[i]);
						} else {
							data.resize(width, height)
								.writeAsync(`resized/${images[i]}`);
						}
					});

					image.resize(width, height)
						.writeAsync(`resized/${images[i]}`, (err));
				}

				main();

				console.log("\033[0m" + `A imagem ${images[i]}` + "\033[0;32m foi redimensionada com sucesso!" + "\033[40;1;37m");
				callbackImg++;
			}


			if (callbackImg == images.length) {
				interval();
			}
		})



	function interval() {

		console.log('\n> Verificando se o(s) arquivo(s) está(ão) pronto(s)');

		let filesExist = 0;

		var meuInterval = setInterval(function() {

			for (let i = 0; i < url.length; i++) {
				let urlRegex = url[i].match(regex)[1];

				let fileName = "img.jpg";

				if (urlRegex !== undefined) {
					fileName = urlRegex.replace('.jpg', '').replace('.png', '').replace('.webp', '').replace('.avif', '').replace('.gif', '') + `.${mainApp.formato.toLowerCase()}`;
				}

				const path = `${__dirname}/resized/${fileName}`;

				fs.access(path, fs.constants.F_OK, (err) => {

					if (err) {} else {
						filesExist++;
					}
				})
			}

			if (filesExist == url.length) {
				callback(true);
				clearInterval(meuInterval);
			}
		}, 1000)
	}

	function callback(situation) {
		if (situation == true) {
			console.log("\n\033[42;1;37m--- Redimensionamento concluído, iniciando a compressão das imagens ---" + "\033[40;1;37m\n");
			if (mainApp.formato.toLowerCase() == 'avif') {
				console.log("\033[0;31mATENÇÃO! Não é possível comprimir imagens do tipo AVIF" + "\033[40;1;37m\n");
			} else {
				if (mainApp.formato.toLowerCase() == 'webp') {
					webpCompress();
				} else {
					imageCompressor();
				}
			}
		}
	}
}

module.exports = resizeImages;