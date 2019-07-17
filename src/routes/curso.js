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
    const cursando = await pool.query("SELECT * FROM cursando WHERE Rut_Alumno = ? AND Id_Curso = ?", [Rut_Alumno, Id_Curso]);
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




    const alumno = await pool.query("SELECT * FROM alumno JOIN cursando USING(Rut_Alumno) WHERE Id_Curso=? ", [Id_Curso]);
    const evaluacion = await pool.query("SELECT * FROM evaluacion WHERE Id_Curso = ?", [Id_Curso]);



    res.render("cursos/mostar_curso", { alumno, curso: curso[0], evaluacion });
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
router.post("/agregarEvaluacion", isLoggedIn, async(req, res) => {
    const { Id_Curso, Nombre_Evaluacion, Ponderacion_Evaluacion } = req.body;
    const newEvaluacion = {
        Nombre_Evaluacion,
        Ponderacion_Evaluacion,
        Id_Curso
    };


    await pool.query("INSERT INTO evaluacion set ?", [newEvaluacion]);
    res.redirect("/curso/mostarCurso/" + Id_Curso);

});
/**Editar Evaluacion del Curso(lISTO NO TOCAR) */
router.get("/editarEvaluacion/:Id_Evaluacion", async(req, res) => {
    const { Id_Evaluacion } = req.params;
    const archivo = await pool.query("SELECT * FROM archivo WHERE Id_Evaluacion = ?", [Id_Evaluacion]);

    console.log(archivo);

    const evaluacion = await pool.query("SELECT * FROM evaluacion WHERE Id_Evaluacion = ?", [Id_Evaluacion]);

    res.render("cursos/editar_evaluacion", { evaluacion: evaluacion[0], archivo: archivo[0] });
});






/**Editar Evaluacion del Curso(lISTO NO TOCAR) */
router.post("/editarEvaluacion/:Id_Evaluacion", async(req, res) => {
    const { Id_Evaluacion } = req.params;
    const { Nombre_Evaluacion, Ponderacion_Evaluacion, Id_Curso } = req.body;
    const editevaluacion = {
        Id_Evaluacion,
        Nombre_Evaluacion,
        Ponderacion_Evaluacion,
        Id_Curso
    }

    console.log(editevaluacion);

    const evaluacion = await pool.query("UPDATE evaluacion set ? WHERE Id_evaluacion = ?", [editevaluacion, Id_Evaluacion]);


    res.redirect("/curso/mostarCurso/" + Id_Curso);
});
/**Eliminar Evaluacion del Curso (LISTO NO TOCAR) */
router.get("/eliminarEvaluacion/:Id_Evaluacion/:Id_Curso", async(req, res) => {
    const { Id_Evaluacion, Id_Curso } = req.params;

    const evaluacion = await pool.query("DELETE FROM evaluacion WHERE Id_Evaluacion = ?", [Id_Evaluacion]);

    res.redirect("/curso/mostarCurso/" + Id_Curso);
});


/**eliminar Alumno Curso(LISTO NO TOCAR) */
router.get("/eliminarAlumno/:Id_Curso/:Rut_Alumno", async(req, res) => {
    const { Id_Curso, Rut_Alumno } = req.params;

    await pool.query("DELETE FROM cursando WHERE Rut_Alumno = ? AND Id_Curso= ?", [Rut_Alumno, Id_Curso]);

    res.redirect("/curso/mostarCurso/" + Id_Curso);
});



/**Cargar un archivo al servidor */
router.post('/upload/:Id_Evaluacion', async(req, res) => {
    const { Id_Evaluacion } = req.params;


    const archivo = await pool.query("SELECT * FROM archivo WHERE Id_Evaluacion = ?", [Id_Evaluacion]);

    if (archivo.length > 0) {
        res.redirect("/curso/editarEvaluacion/" + Id_Evaluacion);
    } else {

        console.log(Id_Evaluacion);
        let EDFile = req.files.file
        EDFile.mv(`./src/public/img/${EDFile.name}`);
        console.log(EDFile);
        const archivo = {
            Nombre_Archivo: EDFile.name,
            Tipo_Archivo: EDFile.mimetype,
            Id_Evaluacion
        };
        console.log(archivo);
        await pool.query("INSERT INTO archivo SET ?", [archivo]);
        res.redirect("/curso/editarEvaluacion/" + Id_Evaluacion);
    }


});


module.exports = router;