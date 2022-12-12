const downloadImages = require('./download');
const https = require('https');

function execute() {
	var fs = require('fs');

	var array = fs.readFileSync('insercao de links.txt').toString().replace(/(\r\n|\n|\r)/gm, "").split(",");
	let callback = 0;
	let regex = new RegExp("\.(jpg|jpeg|png|avif|webp|gif|JPG|JPEG|PNG|GIF|AVIF|WEBP)$")
	let newArray = [];
	let j = 0;

	array = array.filter(vazio => vazio !== '');

	for (let i = 0; i < array.length; i++) {
		const urlImages = new URL(array[i]);
		let params = urlImages.search;
		array[i] = urlImages.href.replace(params, '');
	}

	for (let i = 0; i < array.length; i++) {
		new Promise(function(resolve, reject) {
			https.get(array[i], (res) => {
				resolve(res)
			})
		}).then(function(res) {
			if (res.statusCode >= 200 && res.statusCode < 400) {
				if(array[i].match(regex)){		
					newArray[j] = array[i]
					j++;
				} else{
					console.log(`O link ${array[i]} é inválido, verifique e tente novamente`)
				}
			} else {
				console.log(`O link ${array[i]} é inválido, verifique e tente novamente`)
			}
			callback++;
			if (callback == array.length) {
				downloadImages();
			}
		})
	}

	let dir = "./files";

	//Verifica se não existe
	if (!fs.existsSync(dir)) {
		//Efetua a criação do diretório
		fs.mkdirSync(dir);
	}

	dir = "./resized";
	//Verifica se não existe
	if (!fs.existsSync(dir)) {
		//Efetua a criação do diretório
		fs.mkdirSync(dir);
	}

	dir = "./compressed";
	//Verifica se não existe
	if (!fs.existsSync(dir)) {
		//Efetua a criação do diretório
		fs.mkdirSync(dir);
	}

	dir = "./converted";
	//Verifica se não existe
	if (!fs.existsSync(dir)) {
		//Efetua a criação do diretório
		fs.mkdirSync(dir);
	}

	const textoFinal = {
		arrayDeLinks: newArray
	}

	console.log("\n\033[42;1;37m--- Iniciando o Download das imagens ---" + "\033[40;1;37m\n");

	module.exports = textoFinal;
}

module.exports = execute;