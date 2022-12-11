function downloadImages() {
	const convertImages = require('./conversor');
	const textoFinal = require('./execute');
	const fs = require('fs');
	const https = require('https');

	// URL da imagem
	let url = textoFinal.arrayDeLinks;

	// Regex para pegar o mesmo nome da imagem
	const regex = new RegExp("\/([^/]*)$");

	let callbackImg = 0;

	for (let i = 0; i < url.length; i++) {

		https.get(url[i], (res) => {

			let urlRegex = url[i].match(regex)[1];
			let fileName = "img.jpg";

			if (urlRegex !== undefined) {
				fileName = urlRegex;
			}

			const path = `${__dirname}/files/${fileName}`;
			const filePath = fs.createWriteStream(path);
			res.pipe(filePath);
			filePath.on('finish', (err) => {
				filePath.close();
				console.log("\033[0m" + `Download da imagem ${fileName}` + "\033[0;32m concluído");
				callbackImg++;

				if (callbackImg == url.length) {
					interval();
				}
			})
		})
	}

	function interval() {
		console.log('\n> Verificando se o arquivo existe');

		let filesExist = 0;

		var meuInterval = setInterval(function() {

			for (let i = 0; i < url.length; i++) {
				let urlRegex = url[i].match(regex)[1];

				let fileName = "img.jpg";

				if (urlRegex !== undefined) {
					fileName = urlRegex;
				}

				const path = `${__dirname}/files/${fileName}`;

				fs.access(path, fs.constants.F_OK, (err) => {

					if (!err) {
						filesExist++;
					}
				})
			}

			if (filesExist == url.length) {
				callback(true);
				clearInterval(meuInterval);
			}
		}, 1000);
	}

	function callback(situation) {
		if (situation == true) {
			console.log("\n\033[42;1;37m--- Iniciando a conversão das imagens ---" + "\033[40;1;37m\n");
			convertImages();
		}
	}
}

module.exports = downloadImages;