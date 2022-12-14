const mainApp = require('./app');

let dir = 'resized'

if (mainApp.width == null && mainApp.height == null) {
	dir = 'converted'
}

function webpCompress() {
	const fs = require('fs');
	const sharp = require('sharp');
	const fsp = require('fs/promises');
	const path = require('path');

	fsp.readdir(path.join(`./${dir}`)).then(async (resized) => {
		const images = resized.filter((image) => true);
		for (let i = 0; i < images.length; i++) {
			await sharp(input = `./${dir}/${images[i]}`).webp({
				lossless: false,
				alphaQuality: 100,
				quality: mainApp.qualidade,
				force: true
			}).toFile('./compressed/' + images[i].toString()).then((info, err) => {
				if (err) {
					console.log(`Não foi possível comprimir a imagem ${images[i]}`);
				} else {
					fs.stat(`./${dir}/${images[i]}`, (err, stats) => {
						if (err) {
							console.log(`O arquivo não existe`);
						} else {
							let oldSize = (stats.size);
							let newSize = (info.size);
							let decreased = (((newSize * 100) / (oldSize) - 100) * -1).toFixed(2);
							let increased = ((newSize * 100) / (oldSize) - 100).toFixed(2);

							setTimeout(() => {
								if (newSize > oldSize) {
									console.log("\033[31mATENÇÃO!" + "\033[0m o tamanho da imagem " + images[i] + " aumentou " + "\033[31m+" + increased + "%" + "\033[0m");
								} else {
									console.log("\033[0;32mATENÇÃO!" + "\033[0m o tamanho da imagem " + images[i] + " diminuiu " + "\033[0;32m" + decreased + "%" + "\033[0m");
								}
								console.log('Tamanho antigo: ' + (oldSize / 1000).toFixed(2) + ' KB');
								console.log('Tamanho comprimido: ' + (newSize / 1000).toFixed(2) + ' KB');
								console.log('');
							}, 500);
						}
					})
				}
			})
		}
	})
}

module.exports = webpCompress;