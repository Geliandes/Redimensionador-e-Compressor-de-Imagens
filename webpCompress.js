const mainApp = require('./app');

let dir = 'resized'

if (mainApp.width == null && mainApp.height == null) {
	dir = 'converted'
}

function webpCompress() {
	const sharp = require('sharp');
	const fsp = require('fs/promises');
	const path = require('path');

	fsp.readdir(path.join(`./${dir}`))
		.then(resized => {
			const images = resized.filter((image) => true);

			for (let i = 0; i < images.length; i++) {
				sharp(input = `./${dir}/${images[i]}`)
					.webp({
						lossless: false,
						alphaQuality: 100,
						quality: mainApp.qualidade,
						force: true
					})
					.toFile('./compressed/' + images[i].toString(), (err, info) => {
						if (err) {
							console.log(`Não foi possível comprimir a imagem ${images[i]}`);
						}
					})
			}
		})
}
/*
                else{
                    setTimeout(() => {                 
                        oldSize(images, i);
                        newSize(images, i);
                    }, 5000);
                    setTimeout(()=>{
                        oldSize(images, i);
                        newSize(images, i);

                        if(newSize(images, i) < oldSize(images, i)){
                            let increased = ((newSize(images, i) * 100) / (oldSize(images, i)) - 100).toFixed(2)
                            console.log("\033[31mATENÇÃO!" +"\033[0m o tamanho da imagem " + images[i] + " aumentou " + "\033[31m+" + increased + "%" +"\033[0m")
                        } else{
                            let decreased = ((newSize(images, i) * 100) / (oldSize(images, i)) - 100).toFixed(2)
                            console.log("\033[0;32mATENÇÃO!" +"\033[0m o tamanho da imagem " + images[i] + " diminuiu " + "\033[0;32m" + decreased + "%" +"\033[0m")
                        }
                    },10000) 
                }
            });
        }
    })
}

function oldSize(images, i){
    const fs = require('fs');
    const path = require('path');

    fs.stat(path.join(`./${dir}/${images[i]}`), (err, stats) => {
        if(err){
            console.log(err)
        }
        globalThis.oldSizeValue = (stats.size/1000).toFixed(2);
    })
    return globalThis.oldSizeValue
}


function newSize(images, i){
    const fs = require('fs');
    const path = require('path');
    fs.stat(path.join(`./compressed/${images[i]}`), (err, stats) => {
        if(err){
            console.log(err)
        }
        globalThis.newSizeValue = (stats.size/1000).toFixed(2);
    })
    return globalThis.newSizeValue
}
*/
module.exports = webpCompress;