module.exports = (rows, files, file, author, version = "v3.3.7") => {
	var vars = ''
	var columns = ''
	var alias = ''
	var search = ''
	var searchS = ''
	var uodate = ''
	var insert = ''
	var insertS = ''
	var insertVars = ''
	for (const row of rows) {
		vars += `
		/**
		 * Atributo privado para ${row.name} del ${file}.
		 * @access private
		 * @var string
		 */
		private $_${row.name};
		`;
		columns += `, '${files.toLowerCase()}.${row.name}'`
		alias += `, ${files.toLowerCase()}.${row.name} AS ${row.alias}`
		search += `$this->_${row.name} =$this->formatear($criterio, "CadenaBusqueda");
		`
		searchS += ` OR ${files.toLowerCase()}.${row.name}`
		insert += `$this->_${row.name} =$this->formatear($registro->${row.alias}, "${row.type}");
		`
		insertS += `, %s`
		insertVars += `, $this->_${row.name}`
		update += `${files.toLowerCase()}.${row.name}=%s`
	}
	return `
<?php 
require_once 'base.php';
require_once 'peticiones.php';
/**
* Clase ${files}, para brindar Funcionalidades para la tabla Paises.
* Software Escolaris©
* ©author ${author}.
* ©copyright Derechos reservados, México 2008-2016 Registros 03-2098—021510561900-01 03-2098—021510484100-01
* ©version ${version}
* ©package Escolaris
* ©final
*/

final Class ${files} extends Base implements peticiones
{
	/**
	 * Atributo privado para el query de SQL.
	 * @access private
	 * @var string
	 */
	private $_sql;
	
	/**
	 * Atributo privado para el ID del ${file}
	 * @access private
	 * @var int
	 */
	private $_id${file};
	
	${vars}

	/**
	 * Atributo privado para el del ${file}.
	 * @access private
	 * @var string
	 */

	private $_tipo;
	
	/**
	 * Atributo privado para el reporte PDF.
	 * @access private
	 * @var object
	 */
	private $_reportePDF;
	
	/**
	 * Atributo privado el ResultSet de MySQL
	 * @access private
	 * @var object
	 */
	private $_resultSet;
	
	/**
	 * Atributo privado para un Registro del ResultSet de MySQL
	 * @access private
	 * @var object
	 */
	private $_registro;
	
	/**
	 * Atributo privado con el criterio, para las busquedas.
	 * @access private
	 * @var string
	 */
	private $_criterio;
	
	/**Atributo privado con el nombre de UNA columna, para las busquedas.
	 * @access private
	 * @var string
	 */
	private $_columna;
	
	/**
	 * Atributo privado con los nombres de TODAS las columnas.
	 * @access private
	 * @var array
	 */
	private $_columnas;
	
	/**
	 * Atributo privado para los ALIAS de todas las columnas.
	 * @access private
	 * @var string
	 */
	private $_aliasColumnas;
	
	/**
	 * Constructor de la Clase ${files}, para invocar el Constructor de la Clase heredada, y validar sesiones.
	 * @access public
	 * @return void
	 */
	public function __construct()
	{
		//verificar si esta logeado:
		if(parent::validaSesion()) {
			// Si es asi, mandamos a llamar el constructor del padre:
			parent::__construct();
			//Inicializamos valores:
			$this->_columnas = array('','${files.toLowerCase()}.id_${file.toLowerCase()}'${columns});
			$this->_aliasColumnas = '${files.toLowerCase()}.id_${file.toLowerCase()} AS a${alias}';
		} else {
			//caso contrario lo mandamos a la goma:
			throw new Exception("No tienes permisos.");
			return;
		}
	}
	
	/**
	 * Función para listar los Registros de la tabla de ${file}.
	 * @access public
	 * @param int Se utiliza para establecer el tipo de devolución.
	 * @return object El juego de Resultados (puede ser un json, array, o resultset).
	 */
	public function listar($tipo)
	{
		$this->_tipo = intval($tipo);
		$this->_sql = sprintf("SELECT %s FROM ${files.toLowerCase()} WHERE ${files.toLowerCase()}.id_${file.toLowerCase()}>=1 ORDER BY ${files.toLowerCase()}.id_${file.toLowerCase()} ASC;", $this->_aliasColumnas);
		return $this->sentenciaSQL($this->_sql, $this->_tipo);
	}
	
	/**
	 * Función para buscar Registros en la tabla ${file}. vamos a ver si funciona
	 * @access public
	 * @param string El criterio a buscar en la tabla.
	 * @param string En que columna se va a buscar en la tabla.
	 * @param int Se utiliza para establecer el tipo de devolucion.
	 * @return object El juego de Resultados (puede ser un json, array, o resultset).
	 */
	public function buscar($criterio, $columna, $tipo)
	{
		$this->_tipo = intval($tipo);
		$columna = intval($columna);
		if($columna == 0){
			$this->_id${file} =$this->formatear($criterio, "CadenaBusqueda");
			${search}
			$this->_sql = sprintf("SELECT %s FROM ${files.toLowerCase()} WHERE (${files.toLowerCase()}.id_${file.toLowerCase()} LIKE %s ${searchS}) ORDER BY ${files.toLowerCase()}.id_${file.toLowerCase()} ASC;", $this->_aliasColumnas, $this->_id${file}${insertVars} );//era esta creo
		}else{
			$this->_columna = $this->_columnas[$columna];//vale? ok :D va solo revisa tu documentacion, toda y que los campos no rebasesn como lostengas asignados en tu base de datos// as si solo meti ese campo Entonces ya esta bien .?
			$this->_criterio = $this->formatear($criterio, "CadenaBusqueda");
			$this->_sql = sprintf("SELECT %s FROM ${files.toLowerCase()} WHERE %s LIKE %s ORDER BY ${files.toLowerCase()}.id_${file.toLowerCase()} ASC;", $this->_aliasColumnas,$this->_columna,$this->_criterio);
		}
		return $this->sentenciaSQL($this->_sql, $this->_tipo);
	}
	
	
	public function insertar($registro)
	{
		if(is_array($registro)){
			$registro=(object)$registro;
		}
		${insert}
		$this->_sql =sprintf("INSERT INTO ${files.toLowerCase()} VALUES(NULL${insertS});"${insertVars});
		return $this->sentenciaSQL($this->_sql, 4);
		
	}
	
	
	public function actualizar($registro)
	{
		if(is_array($registro)){
			$registro=(object)$registro;
		}
		$this->_id${file} =$this->formatear($registro->a, "Entero");
		${insert}
		$this->_sql =sprintf("UPDATE ${files.toLowerCase()}
		SET ${update} WHERE ${files.toLowerCase()}.id_${file.toLowerCase()}=%s LIMIT 1;"${insertVars}, $this->_id${file});
		return $this->sentenciaSQL($this->_sql, 5);
	}
	
	
	public function borrar($registro)
	{
		if(is_array($registro)){
			$registro=(object)$registro;
		}
		$this->_id${file} =$this->formatear($registro->a, "Entero");
		$this->_sql =sprintf("DELETE FROM ${files.toLowerCase()} WHERE ${files.toLowerCase()}.id_${file.toLowerCase()}=%s LIMIT 1;",
        $this->_id${file});
		return $this->sentenciaSQL($this->_sql, 5);
	}
	
	
	public function reportePDF($tipo, $criterio='', $columna='')
	{
		throw new Exception('Los veran el proximo cuatrimestre');
	}
}

?>
`
}