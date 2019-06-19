const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require('../lib/auth')

/**Vista de las carpetas */
router.get("/principal", isLoggedIn, async(req, res) => {
    const carpetas = await pool.query("SELECT * FROM carpeta WHERE Rut_Usuario=?", [req.user.Rut_Usuario]);
    res.render("cursos/menu_principal", { carpetas });
});
/**Vista Agregar carpeta */
router.get("/addCarpeta", isLoggedIn, async(req, res) => {

    res.render("cursos/agregar_carpeta");
});

/**Vista Editar Carpeta */
router.get("/editarCarpeta/:Id_Carpeta", isLoggedIn, async(req, res) => {
    const { Id_Carpeta } = req.params;
    const carpeta = await pool.query('SELECT * FROM carpeta WHERE Id_Carpeta = ?', [Id_Carpeta]);
    console.log(carpeta);
    res.render("cursos/editar_carpeta", { carpeta: carpeta[0] });
});
/**Agrega carpeta en la BD */
router.post("/addCarpeta", isLoggedIn, async(req, res) => {
    const { Nombre_Carpeta } = req.body;
    const nuevaCarpeta = {
        Nombre_Carpeta,
        Rut_Usuario: req.user.Rut_Usuario
    };
    const carpeta = await pool.query("SELECT * FROM carpeta WHERE Nombre_carpeta=? AND Rut_Usuario = ?", [Nombre_Carpeta, req.user.Rut_Usuario]);
    if (carpeta.length > 0) {
        req.flash('message', 'Carpeta ya agregada !!');
        res.redirect("/carpeta/principal");

    } else {
        await pool.query("INSERT INTO carpeta set ?", [nuevaCarpeta]);
        req.flash('success', 'Carpeta Agregada Exitosamente!!');
        res.redirect("/carpeta/principal");
    }
});
/** Editar Carpeta en la BD*/
router.post("/editarCarpeta/:Id_Carpeta", isLoggedIn, async(req, res) => {
    const { Id_Carpeta } = req.params;
    const { Nombre_carpeta } = req.body;
    const nuevaCarpeta = {
        Nombre_carpeta
    };
    const carpeta = await pool.query("SELECT * FROM carpeta WHERE Nombre_carpeta=?", [Nombre_carpeta]);
    if (carpeta.length > 0) {
        req.flash('message', 'No se pudo editar el nombre !!');
        res.redirect("/carpeta/principal");
    } else {

        await pool.query('UPDATE carpeta set ? WHERE Id_Carpeta = ?', [nuevaCarpeta, Id_Carpeta]);
        res.redirect("/carpeta/principal");
    }
});

/** Eliminar Carpeta BD*/
router.get("/eliminar/:Id_Carpeta", isLoggedIn, async(req, res) => {
    const { Id_Carpeta } = req.params;
    const curso = await pool.query('SELECT * FROM curso WHERE Id_Carpeta = ?', [Id_Carpeta]);
    if (curso.length > 0) {
        req.flash('message', 'Carpeta NO Eliminada, Verifique que no tenga cursos creados !!');
        res.redirect("/carpeta/principal");

    } else {


        await pool.query('DELETE FROM carpeta WHERE Id_Carpeta = ?', [Id_Carpeta]);
        res.redirect("/carpeta/principal");
    }
});


module.exports = router;