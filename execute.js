const downloadImages = require('./download');

function execute() {
	var fs = require('fs');
	var array = fs.readFileSync('insercao de links.txt').toString().replace(/(\r\n|\n|\r)/gm, "").split(",");
	array = array.filter(vazio => vazio !== '');

	for(let i = 0; i < array.length; i++){
		const urlImages = new URL(array[i]); 
		let params = urlImages.search;
		array[i] = urlImages.href.replace(params, '');
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
		arrayDeLinks: array
	}

	console.log(textoFinal.arrayDeLinks);
	console.log("\n\033[42;1;37m--- Iniciando o Download das imagens ---" + "\033[40;1;37m\n");

	module.exports = textoFinal;

	downloadImages();
}

module.exports = execute;