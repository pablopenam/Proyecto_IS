const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/addlistaCotejo", (req, res) => {
    res.render("lista_cotejo/crear_lista_cotejo");
});

router.get("/CriterioListaCotejo/:Id_ListaCotejo", (req, res) => {
    const { Id_ListaCotejo } = req.params

    res.render("lista_cotejo/lista_cotejo", { Id_ListaCotejo });
});

router.post("/addlistaCotejo", async(req, res) => {
    const { Nombre_ListaCotejo, Descripcion_ListaCotejo } = req.body;

    const nuevaListacotejo = {
        Nombre_ListaCotejo,
        Descripcion_ListaCotejo,
        Rut_Usuario: req.user.Rut_Usuario
    };

    const ListaCotejo = await pool.query("INSERT INTO listacotejo set ?", [nuevaListacotejo]);
    const Id_ListaCotejo = ListaCotejo.insertId;
    console.log(ListaCotejo);
    console.log(Id_ListaCotejo);
    res.redirect("CriterioListaCotejo/" + Id_ListaCotejo);

});
router.post("/guardarCriterioListaCotejo/:Id_ListaCotejo", async(req, res) => {
    const { Descripcion_CriterioListaCotejo, Puntuacion_CriterioListaCotejo } = req.body;
    const { Id_ListaCotejo } = req.params;




    /**Almacena los criterios ccon el Id_Rubrica pasado por direccion */
    for (var i in Descripcion_CriterioListaCotejo) {
        const nuevoCriterio = await pool.query('INSERT INTO criterioslistacotejo (Descripcion_CriterioListaCotejo,Puntuacion_CriterioListaCotejo,Id_ListaCotejo ) values (?,?,?)', [Descripcion_CriterioListaCotejo[i], Puntuacion_CriterioListaCotejo[i], Id_ListaCotejo]);
    }
});
/**Mostrar Listas de Cotejo */
router.get("/listasCotejos", async(req, res) => {
    /**Se seleccionan todas las listas de Cotejos asociadas al Rut_Usuario con el que se inicio sesión */
    const ListaCotejo = await pool.query("Select * FROM listacotejo WHERE Rut_Usuario=?", [req.user.Rut_Usuario]);


    res.render('lista_cotejo/vista_listacotejo', { ListaCotejo });

});

/**Funcion para mostrar la Lista de Coetejo */
router.get("/mostrarListaCotejo/:Id_ListaCotejo", async(req, res) => {
    /**Rescatamos el Id de la Lista de Cotejo desde la URL */
    const { Id_ListaCotejo } = req.params;

    /**Se Consulta a la BD*/
    const ListaCotejo = await pool.query("SELECT * FROM listacotejo WHERE Id_ListaCotejo = ?", [Id_ListaCotejo]);
    const CriterioListaCotejo = await pool.query("SELECT * FROM criterioslistacotejo WHERE Id_ListaCotejo = ?", [Id_ListaCotejo]);
    console.log(ListaCotejo[0]);

    res.render("lista_Cotejo/mostrar_listacotejo", { ListaCotejo: ListaCotejo[0], CriterioListaCotejo });

});

/**Funcion para Editar la Lista de Coetejo */
router.post("/editarListaCotejo/:Id_CriterioListaCotejo/:Id_ListaCotejo", async(req, res) => {

    const { Descripcion_CriterioListaCotejo } = req.body;
    const { Id_CriterioListaCotejo, Id_ListaCotejo } = req.params;

    const nuevaCriterio = {
            Descripcion_CriterioListaCotejo,
            Id_ListaCotejo
        }
        /**Se editar los datos en la BD*/
    await pool.query("UPDATE criterioslistacotejo set ? WHERE Id_CriterioListaCotejo = ?", [nuevaCriterio, Id_CriterioListaCotejo]);

    res.redirect("/listaCotejo/mostrarListaCotejo/" + Id_ListaCotejo);

});

/**eliminar Lista de Cotejo */
router.get("/eliminarListaCotejo/:Id_ListaCotejo", async(req, res) => {
    const { Id_ListaCotejo } = req.params;

    await pool.query("DELETE FROM criterioslistacotejo WHERE Id_ListaCotejo = ?", [Id_ListaCotejo]);
    await pool.query("DELETE FROM listacotejo WHERE Id_ListaCotejo = ?", [Id_ListaCotejo]);
    res.redirect("/listaCotejo/listasCotejos/");
});
/**Funcon para eliminar un criterio de la Lista de Cotejo */
router.get("/eliminarcriterioListaCotejo/:Id_CriterioListaCotejo/:Id_ListaCotejo", async(req, res) => {
    const { Id_CriterioListaCotejo, Id_ListaCotejo } = req.params;

    await pool.query("DELETE FROM criterioslistacotejo WHERE Id_CriterioListaCotejo = ?", [Id_CriterioListaCotejo]);

    res.redirect("/listaCotejo/mostrarListaCotejo/" + Id_ListaCotejo);
});



router.post("/nueva_evaluacion/", async(req, res) => {
    const { Rut_Alumno, Id_ListaCotejo } = req.body;

    console.log(Rut_Alumno);
    console.log(Id_ListaCotejo);
});


module.exports = router;