const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require('../lib/auth')


router.get("/", async(req, res) => {

    const curso = await pool.query("SELECT * FROM carpeta  JOIN curso USING(Id_Carpeta) WHERE Rut_Usuario = ?", [req.user.Rut_Usuario])




    const rubrica = await pool.query("SELECT * FROM rubrica WHERE Rut_Usuario = ?", [req.user.Rut_Usuario]);
    const listacotejo = await pool.query("SELECT * FROM listacotejo WHERE Rut_Usuario = ?", [req.user.Rut_Usuario]);


    res.render('evaluacion/principal', { curso, rubrica, listacotejo });
});






router.post("/evaluarLC", async(req, res) => {

    const { Id_Curso, Id_ListaCotejo } = req.body;
    const alumno = await pool.query("SELECT * FROM alumno JOIN cursando USING(Rut_Alumno) WHERE Id_Curso=? ", [Id_Curso]);
    for (var i in alumno) {
        const alumnosevaluar = await pool.query("INSERT INTO evaluar SET ?", [alumno[i].Rut_Alumno])
    }
    console.log(Id_Curso);
    console.log(Id_ListaCotejo);
    res.render("lista_Cotejo/seleccionar_evaluados", { alumno, Id_Curso, Id_ListaCotejo })


    /**   const { Id_ListaCotejo } = req.body;
      //console.log(Id_ListaCotejo);
      const lista = await pool.query("SELECT * FROM listacotejo WHERE Id_ListaCotejo = ?", [Id_ListaCotejo]);
      //console.log(lista[0]);
      const LCotejo = await pool.query("SELECT * FROM criterioslistacotejo  WHERE Id_ListaCotejo= ?", [Id_ListaCotejo]);
      //console.log(LCotejo);
      res.render('evaluacion/evaluar_listacotejo', { LCotejo, lista: lista[0] });*/
});

router.post("/evaluarListaCotejo", async(req, res) => {
    const { Id_CriterioListaCotejo, logrado, Observacion_ListaCotejo } = req.body;
    const evaluacionguardar = await pool.query("INSER INTO criteriosRubrica (Descripcion_Criterio,Id_Rubrica ) values (?,?)", [Descripcion_Criterio[i], Id_Rubrica])
});

router.get("/seleccion_evaluados/:Id_Curso", async(req, res) => {
    const { Id_Curso } = req.params;

    const alumno = await pool.query("SELECT * FROM alumno JOIN cursando USING(Rut_Alumno) WHERE Id_Curso=? ", [Id_Curso]);
    console.log(alumno);
    const evaluacion = await pool.query("SELECT * FROM evaluacion WHERE Id_Curso = ?", [Id_Curso]);
    console.log(evaluacion);
    const ListaCotejo = await pool.query("Select * FROM listacotejo WHERE Rut_Usuario=?", [req.user.Rut_Usuario]);

    res.render("lista_Cotejo/seleccionar_evaluados", { alumno, ListaCotejo })
});

router.post("/nueva_evaluacion", async(req, res) => {

    const { Rut_Alumno } = req.body;

    console.log(Rut_Alumno);




});






module.exports = router;