module.exports = (rows, files, file, author, version = '3.3.7') => {
	var jsObjects = ''
	var jsAdd = ''
	var jsEdit = ''
	var jsSave = ''
	var jsConfirm = ''
	var jsVerifi = ''
	for (const row of rows) {
		jsObjects += `htmlNuevo += '<td>' + objeto${file}.${row.alias} + '</td>';
		`;
		jsEdit += `$('#${row.name}').val(objeto${file}.${row.alias});
		`;
		jsAdd += `$('#${row.name}').val('');
		`;
		jsSave += `b: $('#${row.name}').val().toString().trim(),
		`;
		jsConfirm += `+ '</strong><br /> ${row.name}: <strong>' + objeto${file}.${row.alias}
		`;
		jsVerifi += `objeto${file}.${row.alias}.length <= 0 ||`
	}
	jsVerifi = jsVerifi.substr(0, jsVerifi.length - 2)
	return `
/**
* JS ${files}, para brindar funcionalidades JSON desde / hacia el servidor.
* Software Escolaris©
* @author ${author}.
* @copyright Derechos reservados, México 2008-2016 Registros 03-2008-021510561000-01 03-2008-021510484100-01
* @version ${version}
* @package js
* @final
*/
/**
* Variable pulica para la generacion de un TimeSlap para asegurarnos que es unico.
* para ver si se esta actualizando el archivo js, al hacer cambios o no...
* @var{String}
*/

var marcaTiempo = new Date().getTime();

/**
* Variable publica que contiene la respuesta del servidor
* @var {JSON}
*/
var jsonRespuesta = null;

/**
 * Variable publica para crear la petición JSON que se enviara al servidor.
 * @var {JSON}
 */
var peticionJSON = null;

/**
 * Variable publica para contener la peticion JSON que se recibe del servidor.
 * @var {JSON}
 */
var json${ files} = null;

/**
 * Variable publica que contiene un Objeto para enviar al servidor.
 * @var {Object}
 */
var objeto${ file} = null;

/**
 * Variable que contien el nombre de la ultima acción realizada.
 * @VAR {String}
 */
var accion = null;

/**
 * Variable publica que contiene el numero de la columna pra busquedas.
 * @var {String}
 */
var columnaBusqueda = null;

/**
 * Variable publica que contiene el criterio para las busquedas.
 * @var {String}
 */
var criterioBusqueda = null;

/**
 * Constante publica con la url del GateWay que recibe las peticiones al servidor.
 * (Si fuera desee un APK o similar, DEBERA incluir la ruta completa: http:://www.dominio.com/etc..)
 * Si fuera desde Windows 8 Desktop, necesitan cambiar el const por var, ya que Windows 8 no soporta const
 * @var {String}
 */
const GATEWAY_${ files.toUpperCase()} = "../zend_gateway/index.php";

/**
 * Constante publica que contiene el nombre de la Clase a invocar al servidor
 * @var {String}
 */
const CLASE_${ files.toUpperCase()} = '${files}';

/**
 * Cuando el documento esta listo, podemos invocar funciones
 * Si es mas de 1 deberan llevar ; al final, de otra manera, no.
 * Mandamos a llamar el metodo de la validación:
 */
$(document).ready(
	listar${ files}()
);

/**
 * Crear chismoso para el tbody:
 */
$('#tbody${files}').bind('click', function (event) {
	if (event.target != "[object HTMLButtonElement]") {
		if (event.target.parentElement == "[object HTMLButtonElement]") {
			seleccionoRegistro(event.target.parentElement.id);
		}
	} else {
		seleccionoRegistro(event.target.id);
	}
});

/**
 * Función para listar todos las ${files} mediante AJAX.
 * @returns {void}
 */
function listar${ files} ()
{
	peticionJSON = JSON.stringify(
		{
			'Id': generarID(),
			'method': 'listar',
			'clase': CLASE_${ files.toUpperCase()},
		'Params' : ['2']
			});
accion = "listar";
$.ajax({
	method: 'POST',
	timeout: 30000,
	data: peticionJSON,
	dataType: 'json',
	url: GATEWAY_${ files.toUpperCase()},
	success : function (jsonRespuesta, estatusRespuesta, jqXHR) {
		exitoListar${ files} (jsonRespuesta, estatusRespuesta, jqXHR);
	},
	error : function (jqXHR, estatusError, textoError) {
		mostrarErrorJSON(jqXHR, estatusError, textoError);
	}
	})
}

/**
* Función Listener para listar los ${files} mediante AJAX.
* @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida del Servidor
* @param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta (success)
* @param {object} jqXHR Objeto XHR, con toda la traza del respuesta.
*/
function exitoListar${ files} (jsonRespuesta, estatusRespuesta, jqXHR)
{
	//Checamos primero, si existio un error Personalizado:
	if (jsonRespuesta.error) {
		mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
		return;
	}
	indice = 0;
	json${ files} = jsonRespuesta.result;
	$('#tbody${files} > tr').remove();
	if (json${ files}.length > 0) {
		htmlNuevo = '';
		for (indice = 0; indice < json${ files}.length; indice++) {
			objeto${ file} = json${files} [indice];
			htmlNuevo += '<tr>';
			htmlNuevo += '<td>';
			htmlNuevo += '<button id="button_editar_' + indice + '" type="button" style="margin: 5px;" aria-label="Editar" class="btn btn-sm btn-warning"><i class="fa fa-pencil" aria-hidden="true"></i></button>';
			htmlNuevo += '&nbsp';
			htmlNuevo += '<button id="button_borrar_' + indice + '" type="button" style="margin: 5px;" araa-label="Borrar" class="btn btn-sm btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>';
			htmlNuevo += '</td>';
			htmlNuevo += '<td>' + objeto${ file}.a + '</td>';
			${jsObjects}
			htmlNuevo += '</tr>';
		}
		$('#tbody${files}').append(sanitizarHTML(htmlNuevo));
	} else {
		mostrarVentanaModal('No hay ${files}');
	}
	switch (accion) {
		case 'buscar':
			//Mostramos el boton de listar todos:
			$('#buttonListarTodos').show();
			break;
		case 'listar':
			//Ocultamos el boton de listar todos:
			$('#buttonListarTodos').hide();
			break;
	}
}

/**
* Función para mostrar el ${file} escogido de la lista.
* @param {int} idBoton el ID del boton pulsado en el tbody
* @returns {void}
*/
function seleccionoRegistro(idBoton) {

	//Partiendo de que llega: button_editar_1, button_editar2 etc... button_borrar_1 y button_borrar_2, etc...
	var arraycitoIDS = idBoton.split('_');
	var queAccion = arraycitoIDS[1];
	//es editar o borrar
	var queRegistro = Number(arraycitoIDS[2]); //Un numero desde Cero (posición del array, no el ID del registro)

	switch (queAccion) {
		case 'editar':
			editar${ file} (queRegistro);
			break;
		case 'borrar':
			confirmarBorrado(queRegistro);
			break;
		default:
			mostrarVentanaModal('No hay accion seleccionada');
			break;
	}
}

/**
* Función para mostrar el ${file} escogido de la lista y poder editarlo.
* @param {int} indiceEscogido El indice escgido de la lista de los ${files}.
* @returns {void}
*/
function editar${ file} (indiceEscogido)
{

	objeto${ file} = json${files} [indiceEscogido];
	$('#tabsMenu a[href="#divTabFormulario${file}"]').tab('show');
	$('#id${file}').val(objeto${file}.a);
	${jsEdit}
	$('#h1TituloFormulario').html(sanitizarHTML('Editar un ${file}'));
}

/**
* Función para mostrar el formulario para un nuevo ${file}.
* @returns {void}
*/
function agregar${ file} ()
{
	objeto${ file} = null;
	$('#tabsMenu a[href="#divTabFormulario${file}"]').tab('show');
	$('#id${file}').val(0);
	${jsAdd}
	$('#h1TituloFormulario').html(sanitizarHTML('Crear un ${file}'));
}

/**
* Función para guardar el ${file}
* @returns {void}
*/
function guardar${ file} ()
{

	objeto${ file} = {
		a: $('#id${file}').val(),
		${jsSave}
	};

	if (objeto${ file}.a == 0) {
		//inserta ${file}:
		accion = 'insertar';
	} else {
		//Actualizar ${file}:
		accion = 'actualizar';
	}
	if (${jsVerifi}) {
		mostrarVentanaModal('Faltan Datos');
		return;
	}
	peticionJSON = JSON.stringify(
		{
			'Id': generarID(),
			'method': accion,
			'clase': CLASE_${ files.toUpperCase()},
			'Params' : [objeto${ file}]
		}
	);
$.ajax({
	method: 'POST',
	timeout: 30000,
	data: peticionJSON,
	dataType: 'json',
	url: GATEWAY_${ files.toUpperCase()},
	success : function (jsonRespuesta, estatusRespuesta, jqXHR) {
		exitoGuardado${ file} (jsonRespuesta, estatusRespuesta, jqXHR);
	},
	error : function (jqXHR, estatusError, textoError) {
		mostrarErrorJSON(jqXHR, estatusError, textoError);
	}
	});
	}

/**
* Función Listener para checar si se guardo o inserto el ${file}.
* @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida del Servidor
* @param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta (success)
* @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
* @returns {void}
*/
function exitoGuardado${ file} (jsonRespuesta, estatusRespuesta, jqXHR)
{
	//Checamos si existio un error:
	if (jsonRespuesta.error) {
		mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
		return;
	}
	switch (accion) {
		case 'insertar':
			if (jsonRespuesta.result > 0) {
				// Si se inserto:
				mostrarVentanaModal('${file} insertado con el ID: ' + jsonRespuesta.result);
			} else {
				//No se inserto
				mostrarVentanaModal('No se pudo insertar el ${file}');
			}
			break;
		case 'actualizar':
			if (jsonRespuesta.result == 1) {
				//Si se actualizo:
				mostrarVentanaModal('${file} ' + objeto${file}.a + ' Actualizado');
			} else {
				//No se actualizo:
				mostrarVentanaModal('No se pudo actualizar el ${file}');
			}
			break;
		default:
			//No sse que paso:
			mostrarVentanaModal('Tipo de respuesta no definido');
			break;
	}
	mostrarListado();
}

/**
* Funcion para solicitar confirmar el borrado del ${file}.
* @param {int} indiceEscogido Indice escogido del array de ${files}.
* @returns {void}
*/
function confirmarBorrado(indiceEscogido) {
	$('#tabsMenu a[href="#divTabBorrar${file}"]').tab('show');
	objeto${ file} = json${files} [indiceEscogido];
	htmlNuevo = 'ID: <strong>' + objeto${ file}.a ` + jsConfirm + `;
	$('#pDatos${file}').html(sanitizarHTML(htmlNuevo));
}

/**
 * Función para borrar el ${file} mediante AJAX.
 * @returns {void}
 */
function borrar${ file} ()
{
	objeto${ file} = { a: objeto${file}.a };
	peticionJSON = JSON.stringify(
		{
			'Id': generarID(),
			'method': 'borrar',
			'clase': CLASE_${ files.toUpperCase()},
		'Params' : [objeto${ file}]
			});
$.ajax({
	method: 'POST',
	timeout: 30000,
	data: peticionJSON,
	dataType: 'json',
	url: GATEWAY_${ files.toUpperCase()},
	success : function (jsonRespuesta, estatusRespuesta, jqXHR) {
		exitoBorrado${ file} (jsonRespuesta, estatusRespuesta, jqXHR);
	},
	error : function (jqXHR, estatusError, textoError) {
		mostrarErrorJSON(jqXHR, estatusError, textoError);
	}
			});
}

/**
* Funcion Listener para checr si se borro o no el ${file}.
* @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida del Servidor
* @param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta (succes)
* @param {object} jqXHR Objeto XHR, con roda la traza del respuesta.
* @returns {void}
*/
function exitoBorrado${ file} (jsonRespuesta, estatusRespuesta, jqXHR)
{
	//Checamos si existio un error:
	if (jsonRespuesta.error) {
		mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
		return;
	}
	if (jsonRespuesta.result == 1) {
		//Si se borro:
		mostrarVentanaModal('${file} ' + objeto${file}.a + ' Borrado <br /> (Recuerde: Este borrado no se puede deshacer).');
	} else {
		//No se borro:
		mostrarVentanaModal('El ${file} ' + objeto${file}.a + 'No pudo ser borrado');
	}
	mostrarListado();
}

/**
 * Funcion para mostrar la pantalla de listado de ${files}.
 * @returns {void}
 */
function mostrarListado() {
	$('#tabsMenu a[href="#divTabLista${files}"]').tab('show');
	listar${ files} ();
}

/**
* Funcion para mostrar la pantalla de Busquedas.
* @returns {void}
*/

function mostrarBusqueda() {
	$('#tabsMenu a[href="#divTabBuscar${file}"]').tab('show');
	$('#inputCriterio').val('');
	$('#selectColumna').val(0).attr('selected', 'selected');
}

/**
* Funcion para buscar los ${files} mediante AJAX
* @returns {void}
*/

function buscar${ file} ()
{
	columnaBusqueda = $('#selectColumna').val();
	criterioBusqueda = $('#inputCriterio').val().toString().trim();
	if (criterioBusqueda.length <= 0) {
		mostrarVentanaModal('Falta el critetrio de busqueda');
		return;
	}
	accion = 'buscar';
	peticionJSON = JSON.stringify({
		'Id': generarID(),
		'method': 'buscar',
		'clase': CLASE_${ files.toUpperCase()},
		'Params' : [criterioBusqueda, columnaBusqueda, '2']
	});
$.ajax({
	method: 'POST',
	timeout: 30000,
	data: peticionJSON,
	dataType: 'json',
	url: GATEWAY_${ files.toUpperCase()},
	success : function (jsonRespuesta, estatusRespuesta, jqXHR) {
		exitoListar${ files} (jsonRespuesta, estatusRespuesta, jqXHR);
	},
	error : function (jqXHR, estatusError, textoError) {
		mostrarErrorJSON(jqXHR, estatusError, textoError);
	}
	});
$('#tabsMenu a[href="#divTabLista${files}"]').tab('show');
	}


/**
* Función para mandar a crear los PDFs, mediante AJAX.
* @returns {void}
*/
function crearPDF() {
	peticionJSON = JSON.stringify(
		{
			'Id': generarID(),
			'method': 'reportePDF',
			'clase': CLASE_${ files.toUpperCase()},
		'Params' : [accion, criterioBusqueda, columnaBusqueda]
			});
$.ajax({
	method: 'POST',
	timeout: 30000,
	data: peticionJSON,
	dataType: 'json',
	url: GATEWAY_${ files.toUpperCase()},
	success: function (jsonRespuesta, estatusRespuesta, jqXHR) {
		exitoCrearPDF(jsonRespuesta, estatusRespuesta, jqXHR);
	},
	error : function (jqXHR, estatusError, textoError) {
		mostrarErrorJSON(jqXHR, estatusError, textoError);
	}
			});
}

/**
 * Función Listener para checar si se hizo el PDF solicitdo o no.
 * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida del Servidor
 * @param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta(success)
 * @param {object} jqXHR Objeto XHR, con toda la traza del respuesta.
 * @returns {void}
 */
function exitoCrearPDF(jsonRespuesta, estatusRespuesta, jqXHR) {
	//Checamos si existio un error:
	if (jsonRespuesta.error) {
		mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
		return;
	}
	if (jsonRespuesta.result != '' && (jsonRespuesta.result.substr(jsonRespuesta.result.length - 4) == '.pdf')) {
		var urlPDF = '../pdfs/' + jsonRespuesta.result;
		if (window.toStaticHTML) {
			//Revisar... pendiente en Windows 8 Desktop...
		} else {
			//Estamos en un navegador web, de escritorio o movil:
			window.open(urlPDF, '_blank');
		}
	} else {
		//No se pudo crear el pdf:
		mostrarVentanaModal('El PDF, no pudo ser creado');
	}
} `
}
