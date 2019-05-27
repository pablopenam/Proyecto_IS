const express = require("express");
const router = express.Router();

const pool = require("../database");


router.get("/verCurso/:Id_Carpeta", async (req, res) => {
  const { Id_Carpeta } = req.params;
  const cursos = await pool.query("SELECT * FROM curso WHERE Id_Carpeta =?", [
    Id_Carpeta
  ]);
  const CARPETA = await pool.query("SELECT * FROM  carpeta WHERE Id_Carpeta =?", [
    Id_Carpeta
  ]);
 
  res.render("cursos/menu_agregar_curso", { cursos, CARPETA: CARPETA[0]});
});


/**VISTA DEL FORMULARIO PARA INGRESAR UN CURSO
 * ENTRADA: ID_CARPETA
 * FUNCION: RECIBE POR PARAMETROS EL ID_CARPETA PAR ASIGNARSELA AL NUEVO CURSO QUE SE INGRESARA POR FORMULARIO 
 * SALIDA: ID_CARPETA
 */
router.get("/addCurso/:Id_Carpeta", (req, res) => {
  /**RECIBE EL ID_CARPETA QUE VIENE EN LA URL */
  const { Id_Carpeta } = req.params;
  /**RENDERISA AL FORMULARIO QUE SE ENCUENTRA EN EN LA DIRECCION DESCRITA Y LE PASA POR PARAMETRO EL ID_CARPETA */
  res.render("cursos/agregar_curso", { Id_Carpeta });
});


/**VISTA DEL FORMULARIO PARA BUSCAR UN ALUMNO
 * ENTRADA:ID_CURSO
 * FUNCION: REDIRECCIONA AL FORMULARIO PARA BUSCAR ALUMNO, ADEMAS RESCATA EL ID_CURSO QUE VIENE DADO POR LA URL Y  PASA POR PARAMETRO AL FORMULARIO DE BUSQUEDA
 * SALIDA:ID_CURSO
 */
router.get("/addAlumno/:Id_Curso", (req, res) => {
  const { Id_Curso } = req.params;

  res.render("cursos/agregar_alumno", { Id_Curso });
});

/**BUSC */
router.post("/buscarAlumno/:Id_Curso", async (req, res) => {
  const {Id_Curso} = req.params;
  const { Rut_Alumno } = req.body;
  const alumno = await pool.query("SELECT * FROM alumno WHERE Rut_Alumno = ?",[Rut_Alumno]);
  console.log(alumno[0])
  if(alumno.length>0){
    res.render("cursos/buscar_alumno", {Id_Curso,alumno: alumno[0]});
  }
  else{

  res.render("cursos/registrar_alumno", {Id_Curso,Rut_Alumno});
}

});
/**GUARDAR ALUMNNO EN CURSANDO */
router.post("/cursandoCurso/:Id_Curso/:Rut_Alumno", async (req,res) =>{
  const {Id_Curso, Rut_Alumno} = req.params;
  const cursando = {Id_Curso, Rut_Alumno};
 await pool.query("INSERT INTO cursando set ?",[cursando]);
 res.redirect("/curso/mostarCurso/"+ Id_Curso);

});


/** mostra el curso seleccionado */
router.get("/mostarCurso/:Id_Curso", async (req, res) => {
  const { Id_Curso } = req.params;
 const curso = await pool.query("SELECT * FROM curso WHERE Id_Curso = ?", [Id_Curso]);
 const cursando = await pool.query("SELECT Rut_Alumno FROM cursando WHERE Id_Curso = ?", [Id_Curso]);
 const alumno = await pool.query("SELECT * from alumno WHERE Rut_Alumno = ?", "cursando");
 console.log(curso)
 console.log(cursando)
 console.log(alumno)
 
 
  res.render("cursos/mostar_curso", {curso: curso[0], cursando,alumno});
});

/**VISTA DE LAS CARPETAS
 * ENTRADA: 
 * FUNCION: RESCATA DESDE LA BASE DE DATOS TODAS LAS CARPETAS CREADAS(COMO AUN NO SE IMPLEMENTA LO DEL LOGIN
 *          RESCATA TODAS LAS CARPETAS, PERO DEBERIA RESCATAR LAS CAREPTAS ASOCIADAS AL RUT_USUARIO QUE SE A                  LOGUEADO)
 * SALIDA: LOS DATOS DE LAS CARPETAS ENCONTRADAS EN LA BD
 */

 /**ASYNC ES UNA FUNCION ASINCRONA QUE ES NECESARIA QUE PARA QUE FUNCIONE EL AWAIT.*/
router.get("/principal", async (req, res) => {
  /**AQUI SE HACE LA CONSULTA A LA BD, LA FUNCION AWAIT HACE QUE LA FUNCION TENGA QUE ESPERAR LA RESPUESTA DE LA BD PARA PODER CONTINUAR */
  const carpetas = await pool.query("SELECT * FROM carpeta");
  res.render("cursos/menu_principal", { carpetas });
});

/** VISTA DEL FORMULARIO PARA AGREGAR UNA CARPETA*/
router.get("/addCarpeta", (req, res) => {
  res.render("cursos/agregar_carpeta");
});

/**VISTA DEL FORMULARIO PARA CREAR RUNA RUBRICA NUEVA */
router.get("/addRubrica", (req, res) => {
  res.render("cursos/agregar_rubrica");
});

/** FUNCION GUARDAR CARPETA
 * ENTRADA:NOMBRE_cARPETA
 * FUNCION:RESCATA ATRAVES DEL METODO "POST" LOS DATOS ENVIADOS DESDE EL FORMULARIO, Y LO GUARDA EN LA BD.
 * LUEGO REDIRECCIONA A LA VISTA PRINCIPAL DE LAS CARPETAS
 * SALIDA:
 */
router.post("/addCarpeta", async (req, res) => {
  const { Nombre_Carpeta } = req.body;
  const nuevaCarpeta = {
    Nombre_Carpeta
  };
  await pool.query("INSERT INTO carpeta set ?", [nuevaCarpeta]);
  res.redirect("/curso/principal");
});

/* Guarda en la base de datos el curso creado*/
router.post("/add", async (req, res) => {
  const {
    Nombre_Curso,
    Anho_Curso,
    Seccion_Curso,
    Descripcion_Curso,
    Id_Carpeta
  } = req.body;

  const nuevoCurso = {
    Nombre_Curso,
    Anho_Curso,
    Seccion_Curso,
    Descripcion_Curso,
    Id_Carpeta
  };

 
  await pool.query("INSERT INTO curso set ?", [nuevoCurso]);
  res.redirect("/curso/verCurso/"+ Id_Carpeta);
});
/* Guarda en la base de datos el curso creado*/
router.post("/addAlumno", async (req, res) => {
  const {
    Rut_Alumno,
    NombreP_Alumno,
    NombreS_Alumno,
    ApellidoP_Alumno,
    ApellidoM_Alumno,
    Email_Alumno,
    Id_Curso
  } = req.body;

  const nuevoAlumno = {
    Rut_Alumno,
    NombreP_Alumno,
    NombreS_Alumno,
    ApellidoP_Alumno,
    ApellidoM_Alumno,
    Email_Alumno,
    
  };
  const nuevoCursando={
    Id_Curso,
    Rut_Alumno
  };
  await pool.query("INSERT INTO alumno set ?", [nuevoAlumno]);
  await pool.query("INSERT INTO cursando set ?", [nuevoCursando]);
  res.redirect("/curso/mostarCurso/"+ Id_Curso);
});

router.get("/cursos/:Id_Carpeta", async (req, res) => {
  const { Id_Carpeta } = req.params;
 
});

/** Eliminar Carpeta */
router.get("/eliminar/:Id_Carpeta", async (req,res)=>{
  const {Id_Carpeta} = req.params;
  await pool.query('DELETE FROM carpeta WHERE Id_Carpeta = ?', [Id_Carpeta]);
  res.redirect("/curso/principal");
});

/**Busca los datos en la BD para Editar Carpeta */
router.get("/editarCarpeta/:Id_Carpeta", async (req,res)=>{
  const {Id_Carpeta} = req.params;
  const carpeta = await pool.query('SELECT * FROM carpeta WHERE Id_Carpeta = ?', [Id_Carpeta]);
  console.log(carpeta);
  res.render("cursos/editar_carpeta", {carpeta: carpeta[0]});
});

/** Editar Carpeta */
router.post("/editarCarpeta/:Id_Carpeta", async (req,res)=>{
  const {Id_Carpeta} = req.params;
  const { Nombre_carpeta } = req.body;
  const nuevaCarpeta = {

    Nombre_carpeta

  };
 await pool.query('UPDATE carpeta set ? WHERE Id_Carpeta = ?', [nuevaCarpeta,Id_Carpeta]);
  res.redirect("/curso/principal");
  
});

/**Busca los datos en la BD para Editar curso */
router.get("/editarCurso/:Id_Curso", async (req,res)=>{
  const {Id_Curso} = req.params;
  const curso = await pool.query('SELECT * FROM curso WHERE Id_Curso = ?', [Id_Curso]);
  console.log(curso);
  res.render("cursos/editar_curso", {curso: curso[0]});
});

/* editar curso*/
router.post("/editarCurso/:Id_Curso", async (req, res) => {
  const {Id_Curso} = req.params;
  const {
    Nombre_Curso,
    Anho_Curso,
    Seccion_Curso,
    Descripcion_Curso,
    Id_Carpeta
  } = req.body;

  const nuevoCurso = {
    Nombre_Curso,
    Anho_Curso,
    Seccion_Curso,
    Descripcion_Curso,
    Id_Carpeta
  };

 
  await pool.query('UPDATE curso set ? WHERE Id_Curso = ?', [nuevoCurso,Id_Curso]);
  res.redirect("/curso/verCurso/"+ Id_Carpeta);
});

/** Eliminar Curso */
router.get("/eliminarCurso/:Id_Curso/:Id_Carpeta", async (req,res)=>{
  const {Id_Curso} = req.params;
  const {Id_Carpeta} = req.params;

  await pool.query('DELETE FROM curso WHERE Id_Curso = ?', [Id_Curso]);
  
  res.redirect("/curso/verCurso/"+ Id_Carpeta);
});
module.exports = router;
