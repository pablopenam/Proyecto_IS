const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require('../lib/auth')


router.get("/", async(req, res) => {
    const usuarios = await pool.query('Select * from usuarios');

    res.render('cursos/vista_usuarios', { usuarios });

});
router.get("/editarUsuario/:Rut_Usuario", async(req, res) => {
    const { Rut_Usuario } = req.params;
    const usuario = await pool.query('SELECT * FROM usuarios WHERE Rut_Usuario= ?', [Rut_Usuario]);
    res.render('cursos/editar_usuario', { usuario: usuario[0] });
});





module.exports = router;