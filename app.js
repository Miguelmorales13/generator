const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const readTitle = (option) => {
	// busca oopciones
	const index = process.argv.indexOf(option)
	if (index === -1) {
		return false
	} else {
		return process.argv[index + 1]
	}
}
const nameFilesP = readTitle('-p')
const nameFilesS = readTitle('-s')
const author = readTitle('--author')
if (!nameFilesS) {
	console.log('No se recivio el parametro del archivo -p [nombre plural]')
	process.exit()
}
if (!nameFilesP) {
	console.log('No se recivio el parametro del archivo -s [nombre singular]')
	process.exit()
}
if (!author) {
	console.log('No se recivio el parametro del archivo --author [Autor]')
	process.exit()
}
// node app.js - s Usuario - p Usuarios--author "Cara de neme"
// Escribe un mensage (stdout)
// process.stdout.write('Deseas ingresar un campo .?: ');
// Se puede escribir en la consola y recivir el parametro (stdin)
var campos = []

const generate = async () => {
	var otra = true;
	do {
		const answers = await inquirer.prompt({
			type: 'confirm',
			name: 'name',
			message: 'Deseas agregar otro campo ?',
			default: true
		})
		otra = await answers.name
		if (otra) {
			await generateQuestion()
		}

	} while (otra);
	generateFiles()
}
generate()
const generateQuestion = async () => {
	const questions = [
		{
			type: 'input',
			name: 'name',
			message: 'Nombre del campo sin espacios',
			filter: function (val) {
				return val.toLowerCase();
			}
		},
		{
			type: 'list',
			name: 'type',
			message: 'Tipo de campo',
			choices: ['Cadena', 'Entero', 'Flotante', 'Flotante2Decimales', 'Fecha', 'HoraConSegundos', 'HoraSinSegundos']
		},
		{
			type: 'confirm',
			name: 'required',
			message: 'El campo es requerido ?',
			default: true
		},
		{
			type: 'input',
			name: 'alias',
			message: 'Alias del campo sin espacios',
			filter: function (val) {
				return val.toLowerCase();
			},
			validate: function (val) {
				var valid = !isNaN(parseFloat(value));
				return valid || 'Please enter a number';
			}
		},
	]
	campos.push(await inquirer.prompt(questions))
}

const generateJS = require('./GenerateJS')
const generateHTML = require('./GenerateHTML')
const generatePHP = require('./GeneratePHP')
const generateFiles = async () => {
	const jsAny = generateJS(campos, nameFilesP, nameFilesS, author)
	const htmlAny = generateHTML(campos, nameFilesP, nameFilesS, author)
	const phpAny = generatePHP(campos, nameFilesP, nameFilesS, author)
	fs.mkdir(path.join(__dirname, 'js'), {}, err => {
		if (err && err.code == 'EEXIST') return;
		if (err) throw err;
	})
	fs.writeFile(path.join(__dirname, 'js', `${nameFilesP.toLowerCase()}.js`), jsAny, (err) => {
		if (err) throw err;
		console.log(`${nameFilesP.toLowerCase()}.js Creado`)
	})
	fs.mkdir(path.join(__dirname, 'paginas'), {}, err => {
		if (err && err.code == 'EEXIST') return;
		if (err) throw err;
	})
	fs.writeFile(path.join(__dirname, 'paginas', `${nameFilesP.toLowerCase()}.html`), htmlAny, (err) => {
		if (err) throw err;
		console.log(`${nameFilesP.toLowerCase()}.html Creado`)
	})
	fs.mkdir(path.join(__dirname, 'zend_gateway'), {}, err => {
		if (err && err.code == 'EEXIST') return;
		if (err) throw err;
	})
	fs.mkdir(path.join(__dirname, 'zend_gateway', 'servicios'), {}, err => {
		if (err && err.code == 'EEXIST') return;
		if (err) throw err;
	})
	fs.writeFile(path.join(__dirname, 'zend_gateway', 'servicios', `${nameFilesP.toLowerCase()}.php`), phpAny, (err) => {
		if (err) throw err;
		console.log(`${nameFilesP.toLowerCase()}.php Creado`)
	})
}
