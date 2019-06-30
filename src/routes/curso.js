const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require('../lib/auth')

/**CURSOS */

router.get("/verCurso/:Id_Carpeta", isLoggedIn, async(req, res) => {
    const { Id_Carpeta } = req.params;
    const cursos = await pool.query("SELECT * FROM curso WHERE Id_Carpeta =?", [
        Id_Carpeta
    ]);
    const CARPETA = await pool.query("SELECT * FROM  carpeta WHERE Id_Carpeta =?", [
        Id_Carpeta
    ]);

    res.render("cursos/menu_agregar_curso", { cursos, CARPETA: CARPETA[0] });
});


router.get("/addCurso/:Id_Carpeta", isLoggedIn, (req, res) => {
    /**RECIBE EL ID_CARPETA QUE VIENE EN LA URL */
    const { Id_Carpeta } = req.params;
    /**RENDERISA AL FORMULARIO QUE SE ENCUENTRA EN EN LA DIRECCION DESCRITA Y LE PASA POR PARAMETRO EL ID_CARPETA */
    res.render("cursos/agregar_curso", { Id_Carpeta });
});

/** VISTA DEL FORMULARIO PARA AGREGAR UNA CARPETA*/
router.get("/addCarpeta", isLoggedIn, (req, res) => {
    res.render("cursos/agregar_carpeta");
});



/** ALUMNO */

/**VISTA DEL FORMULARIO PARA BUSCAR UN ALUMNO
 * ENTRADA:ID_CURSO
 * FUNCION: REDIRECCIONA AL FORMULARIO PARA BUSCAR ALUMNO, ADEMAS RESCATA EL ID_CURSO QUE VIENE DADO POR LA URL Y  PASA POR PARAMETRO AL FORMULARIO DE BUSQUEDA
 * SALIDA:ID_CURSO
 */
router.get("/addAlumno/:Id_Curso", isLoggedIn, (req, res) => {
    const { Id_Curso } = req.params;

    res.render("cursos/agregar_alumno", { Id_Curso });
});

/**BUSCAR ALUMNO */
router.post("/buscarAlumno/:Id_Curso", isLoggedIn, async(req, res) => {
    const { Id_Curso } = req.params;
    const { Rut_Alumno } = req.body;
    const alumno = await pool.query("SELECT * FROM alumno WHERE Rut_Alumno = ?", [Rut_Alumno]);

    if (alumno.length > 0) {
        res.render("cursos/buscar_alumno", { Id_Curso, alumno: alumno[0] });
    } else {

        res.render("cursos/registrar_alumno", { Id_Curso, Rut_Alumno });
    }

});
/**GUARDAR ALUMNNO EN CURSANDO */
router.post("/cursandoCurso/:Id_Curso/:Rut_Alumno", isLoggedIn, async(req, res) => {
    const { Id_Curso, Rut_Alumno } = req.params;
    const newcursando = { Id_Curso, Rut_Alumno };
    const cursando = await pool.query("SELECT * FROM cursando WHERE Rut_Alumno = ?", [Rut_Alumno]);
    if (cursando.length > 0) {
        res.redirect("/curso/mostarCurso/" + Id_Curso);
    } else {
        await pool.query("INSERT INTO cursando set ?", [newcursando]);
        res.redirect("/curso/mostarCurso/" + Id_Curso);
    }
});


/** mostra el curso seleccionado */
router.get("/mostarCurso/:Id_Curso", isLoggedIn, async(req, res) => {
    const { Id_Curso } = req.params;
    const curso = await pool.query("SELECT * FROM curso WHERE Id_Curso = ?", [Id_Curso]);
    const cursando = await pool.query("SELECT Rut_Alumno FROM cursando WHERE Id_Curso = ? ", [Id_Curso]);

    var i = 0;

    var alumno = new Array();

    while (i < cursando.length) {
        const prueba = Object.values(cursando[i]);
        alumno[i] = await pool.query("SELECT * FROM alumno WHERE Rut_Alumno = ?", [prueba]);
        i++;
    };

    res.render("cursos/mostar_curso", { alumno: alumno, curso: curso[0], });
});


/**VISTA DEL FORMULARIO PARA CREAR RUNA RUBRICA NUEVA */
router.get("/addRubrica", isLoggedIn, (req, res) => {
    res.render("cursos/agregar_rubrica");
});



/* Guarda en la base de datos el curso creado*/
router.post("/add", isLoggedIn, async(req, res) => {
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
    res.redirect("/curso/verCurso/" + Id_Carpeta);
});
/* Guarda en la base de datos el curso creado*/
router.post("/addAlumno/:Id_Curso", isLoggedIn, async(req, res) => {

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
    const nuevoCursando = {
        Id_Curso,
        Rut_Alumno
    };
    await pool.query("INSERT INTO alumno set ?", [nuevoAlumno]);
    await pool.query("INSERT INTO cursando set ?", [nuevoCursando]);
    res.redirect("/curso/mostarCurso/" + Id_Curso);
});

router.get("/cursos/:Id_Carpeta", isLoggedIn, async(req, res) => {
    const { Id_Carpeta } = req.params;

});

/**Busca los datos en la BD para Editar curso */
router.get("/editarCurso/:Id_Curso", isLoggedIn, async(req, res) => {
    const { Id_Curso } = req.params;
    const curso = await pool.query('SELECT * FROM curso WHERE Id_Curso = ?', [Id_Curso]);
    res.render("cursos/editar_curso", { curso: curso[0] });
});

/* editar curso*/
router.post("/editarCurso/:Id_Curso", isLoggedIn, async(req, res) => {
    const { Id_Curso } = req.params;
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


    await pool.query('UPDATE curso set ? WHERE Id_Curso = ?', [nuevoCurso, Id_Curso]);
    res.redirect("/curso/verCurso/" + Id_Carpeta);
});

/** Eliminar Curso */
router.get("/eliminarCurso/:Id_Curso/:Id_Carpeta", isLoggedIn, async(req, res) => {
    const { Id_Curso } = req.params;
    const { Id_Carpeta } = req.params;
    const alumno = await pool.query('SELECT * FROM cursando WHERE Id_Curso = ?', [Id_Curso]);

    if (alumno.length > 0) {
        res.redirect("/curso/verCurso/" + Id_Carpeta);
    } else {
        await pool.query('DELETE FROM curso WHERE Id_Curso = ?', [Id_Curso]);

        res.redirect("/curso/verCurso/" + Id_Carpeta);
    }

});
module.exports = router;