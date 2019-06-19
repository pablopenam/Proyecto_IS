const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require('../lib/auth')

router.get("/prueba", (req, res) => {
    res.render("cursos/prueba");
});
router.get("/rubrica3/:id_rubrica", (req, res) => {

    res.render("rubrica/rubrica3");
});
/** 
router.post("/rubrica3/:id_rubrica", (req, res) => {
    req
    res.render("rubrica/rubrica3");
});
*/
router.get("/rubrica4/:id_rubrica", (req, res) => {

    res.render("rubrica/rubrica4");
});
router.get("/rubrica5/:id_rubrica", (req, res) => {

    res.render("rubrica/rubrica5");
});

router.post("/prueba", async(req, res) => {
    const { Nombre_Rubrica, Descripcion_Rubrica, Nivel_Desempeno_Rubrica } = req.body;
    const NuevaRubrica = {
        Nombre_Rubrica,
        Descripcion_Rubrica,
        Nivel_Desempeno_Rubrica
    }

    const nuevo = await pool.query('INSERT INTO rubrica set ?', [NuevaRubrica]);
    const id = nuevo.insertId;
    console.log(nuevo);
    console.log(id);
    if (Nivel_Desempeno_Rubrica == '3') {
        res.redirect('rubrica3/' + id)
    }
    if (Nivel_Desempeno_Rubrica == '4') {
        res.redirect('rubrica4/' + id)
    }
    if (Nivel_Desempeno_Rubrica == '5') {
        res.redirect('rubrica5/' + id)
    }

    //const { criterio, id } = req.body;

    /**   
    console.log(criterio)
    for (var i in criterio)
        await pool.query('INSERT INTO criterios_rubrica (criterio, ) values (?)', criterio[i]);

    res.render("cursos/prueba");
    */
});
module.exports = router;