module.exports = (rows, files, file, author, app = "Generic", version = "v3.3.7") => {
    var html = ''
    var htmlRows = ''
    for (const row of rows) {
        htmlRows += `<th>${row.name.charAt(0).toUpperCase()}${row.name.slice(1)}</th>
        `
        html += `
            <div class="form-group">
                <label for="${row.name}">${row.name.charAt(0).toUpperCase()}${row.name.slice(1)}</label>
                <input id="${row.name}" type="${generateType(row.type)}" class="form-control"
                    placeholder="${row.name} del ${file}" autocomplete="off" />
            </div>`
    }
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>${app} ${version}</title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta name="description" content="${app} System">
    <meta name="author" content="${author}">
    <link rel="stylesheet" href="../estilos/bootstrap.min.css">
    <link rel="stylesheet" href="../estilos/font-awesome.min.css">
    <link rel="stylesheet" href="../estilos/menu_izquierdo.css">
    <link rel="shortcut icon" href="../imagenes/favicon.png" type="image/png">
</head>

<body>
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button class="navbar-toggle collapsed" type="button" data-toggle="collapse"
                    data-target="#navbarMenuColapsable" aria-hidden="false">
                    <span class="sr-only">Menu Colapsable</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a href="menu.html" class="navbar-brand">${app} ${version}</a>
            </div>
            <div id="navbarMenuColapsable" class="navbar-collapse collapse">
                <ul class="nav navbar-nav visible-xs">
                    <li><a href="${files.toLowerCase()}.html">${files}</a></li>
                    <li><a href="">Televisores</a></li>
                    <li><a href="">Tablets</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right visible-xs">
                    <li><a href="javascript: cerrarSesion();">Salir</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div id="divLenguetas" class="container-fluid sr-only">
        <div class="container" role="navigation">
            <ul id="tabsMenu" class="nav nav-tabs">
                <li><a href="#divTabLista${files}" data-toggle="tab">Listado</a></li>
                <li><a href="#divTabFormulario${file}" data-toggle="tab">Formulario</a></li>
                <li><a href="#divTabBorrar${file}" data-toggle="tab">Borrar</a></li>
                <li><a href="#divTabBuscar${file}" data-toggle="tab">Buscar</a></li>
            </ul>
        </div>
    </div><!-- divLenguetas -->

    <div id="divContenedorFluido" class="container-fluid">
        <div id="divRowPrincipal" class="row">
            <div id="divMenuLateral" class="col-sm-3 col-md-2 sidebar">
                <ul class="nav nav-sidebar">
                    <li><a href="${files.toLowerCase()}.html">${files}</a></li>
                    <li><a href="">Televisores</a></li>
                    <li><a href="">Tablets</a></li>
                    <li><a href="javascript: cerrarSesion();">Salir</a></li>
                </ul>
            </div><!-- divMenuLateral -->

            <div id="divContenidoPrincipal" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                <div id="divTabsPrincipal" class="tab-content">
                    <div id="divTabLista${files}" class="tab-pane fade in active">
                        <h1>Catálogo de ${files}</h1>
                        <div class="btn-group btn-group-justified">
                            <a id="buttonAgregar" onclick="javascript: agregar${file}();" class="btn btn-success">
                                <i class="fa fa-plus fa-lg" aria-hidden="true"></i>
                                &nbsp;Agregar ${file}
                            </a>
                            <a id="buttonReporte" onclick="javascript: crearPDF();" class="btn btn-primary">
                                <i class="fa fa-file-pdf-o fa-lg" aria-hidden="true"></i>
                                &nbsp;Crear PDF
                            </a>
                            <a id="buttonBuscar" onclick="javascript: mostrarBusqueda();" class="btn btn-info">
                                <i class="fa fa-search fa-lg" aria-hidden="true"></i>
                                &nbsp;Busqueda
                            </a>
                            <a id="buttonListarTodos" onclick="javascript: listar${files}();" class="btn btn-success">
                                <i class="fa fa-list fa-lg" aria-hidden="true"></i>
                                &nbsp;Listar Todos
                            </a>
                        </div>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>&nbsp;</th>
                                    <th>ID</th>
                                    ${htmlRows}
                                </tr>
                            </thead>
                            <tbody id="tbody${files}">
                                <tr>
                                    <td>
                                        <button id="buttonEditar" type="button" onclick="javascript: editar${file}();"
                                            class="btn btn-sm btn-warning">
                                            <i class="fa fa-pencil" aria-hidden="true"></i>
                                        </button>
                                        &nbsp;<br class="visible-xs visible-sm" style="margin: 5px;" />
                                        <button id="buttonBorrar" type="button" onclick="javascript: borrar${file}();"
                                            class="btn btn-sm btn-danger">
                                            <i class="fa fa-trash" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                    <td>&nbsp;</td>
                                    <td>Esperando datos...</td>
                                    <td>&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                    </div><!-- divTabLista${files} -->

                    <div id="divTabFormulario${file}" class="tab-pane fade in">
                        <h1 id="h1TituloFormulario">Formulario ${files}</h1>
                        <div class="form-group">
                            <label for="id${file}">ID</label>
                            <input id="id${file}" type="text" class="form-control" maxlength="10" placeholder=""
                                autocomplete="off" disabled />
                        </div>
                        ${html}
                        <div class="btn-group btn-group-justified">
                            <a id="buttonListar" onclick="javascript: mostrarListado();" class="btn btn-info">
                                <i class="fa fa-chevron-left fa-lg" aria-hidden="true"></i>
                                &nbsp;Listado
                            </a>
                            <a id="buttonValidar" onclick="javascript: guardar${file}();" class="btn btn-primary">
                                <i class="fa fa-floppy-o fa-lg" aria-hidden="true"></i>
                                &nbsp;Guardar
                            </a>
                        </div>
                    </div><!-- divTabFormulario${file} -->

                    <div id="divTabBorrar${file}" class="tab-pane fade in">
                        <h1>Eliminación de ${file}</h1>
                        <p id="pDatos${file}">${file} en cuestión</p>
                        <p class="text-danger">El borrado del ${file} no se puede deshacer</p>
                        <p class="text-danger">¿Aún asi desea borrar el ${file}?</p>
                        <div class="btn-group btn-group-justified">
                            <a id="buttonNoBorrar" onclick="javascript: mostrarListado();" class="btn btn-info">
                                <i class="fa fa-chevron-left fa-lg" aria-hidden="true"></i>
                                &nbsp;Listado
                            </a>
                            <a id="buttonSiBorrar" onclick="javascript: borrar${file}();" class="btn btn-danger">
                                <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
                                &nbsp;Sí
                            </a>
                        </div>
                    </div><!-- divTabBorrar${file} -->

                    <div id="divTabBuscar${file}" class="tab-pane fade in">
                        <h1>Busqueda de ${file}</h1>
                        <div class="form-group">
                            <label for="selectColumna">Buscar por Columna</label><br />
                            <select id="selectColumna" name="selectColumna" class="form-control">
                                <option value="0">Todas las columnas</option>
                                <option value="1">ID</option>
                                <option value="2">Marca</option>
                                <option value="3">Compañia</option>
                                <option value="4">Modelo</option>

                            </select>
                        </div>
                        <div class="form-group">
                            <label for="inputCriterio">Criterio de busqueda</label>
                            <input id="inputCriterio" type="text" class="form-control" maxlength="100"
                                placeholder="Criterio de busqueda" autocomplete="on" />
                        </div>
                        <div class="btn-group btn-group-justified">
                            <a id="buttonCancelarBusqueda" onclick="javascript: mostrarListado();" class="btn btn-info">
                                <i class="fa fa-chevron-left fa-lg" aria-hidden="true"></i>
                                &nbsp;Listado
                            </a>
                            <a id="buttonBuscarlos" onclick="javascript: buscar${file}();" class="btn btn-primary">
                                <i class="fa fa-search fa-lg" aria-hidden="true"></i>
                                &nbsp;Buscar
                            </a>
                        </div>
                    </div><!-- divTabBuscar${file} -->

                </div><!-- divTabs Principal -->

                <footer>
                    <br />
                    <hr />
                    <p class="text-center">México 2017<sup>©</sup> ${author}</p>
                </footer>

            </div> <!-- divContenidoPrincipal -->
        </div><!-- divRowPrincipal -->
    </div><!-- divContenidoFluido -->
    <div id="divModalAvisos" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">
                        <i class="fa fa-exclamation-triangle fa-lg" aria-hidden="true"></i>
                        &nbsp;Aviso
                    </h4>
                </div>
                <div id="divAvisos" class="modal-body">
                    <p>Este mensaje sera remplazado por otro...</p>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <script src="../js/libs/jquery-3.1.1.min.js" type="text/javascript"></script>
    <script src="../js/libs/bootstrap.min.js" type="text/javascript"></script>
    <script src="../js/sanitizador.js" type="text/javascript"></script>
    <script src="../js/generador_ids.js" type="text/javascript"></script>
    <script src="../js/errores.js" type="text/javascript"></script>
    <script src="../js/salir.js" type="text/javascript"></script>
    <script src="../js/${files.toLowerCase()}.js" type="text/javascript"></script>
</body>

</html>
`
}
const generateType = (type) => {
    ['Cadena', 'Entero', 'Flotante', 'Flotante2Decimales', 'Fecha', 'HoraConSegundos', 'HoraSinSegundos']
    switch (type) {
        case 'Cadena':
            return 'text'
        case 'Entero':
            return 'number'
        case 'Flotante':
            return 'number'
        case 'Flotante2Decimales':
            return 'number'
        case 'Fecha':
            return 'date'
        case 'HoraConSegundos':
            return 'time'
        case 'HoraSinSegundos':
            return 'time'
        default:
            return 'text'
    }
}