const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/prueba", (req, res) => {
    res.render("cursos/prueba");
});
router.get("/rubrica3/:Id_Rubrica", (req, res) => {
    const { Id_Rubrica } = req.params;

    res.render("rubrica/rubrica3", { Id_Rubrica });
});

router.get("/rubrica4/:Id_Rubrica", (req, res) => {
    const { Id_Rubrica } = req.params;
    res.render("rubrica/rubrica4", { Id_Rubrica });
});
router.get("/rubrica5/:Id_Rubrica", (req, res) => {
    const { Id_Rubrica } = req.params;
    res.render("rubrica/rubrica5", { Id_Rubrica });
});

router.post("/prueba", async(req, res) => {
    const {
        Nombre_Rubrica,
        Descripcion_Rubrica,
        Nivel_Desempeno_Rubrica
    } = req.body;
    const NuevaRubrica = {
        Nombre_Rubrica,
        Descripcion_Rubrica,
        Nivel_Desempeno_Rubrica,
        Rut_Usuario: req.user.Rut_Usuario
    };
    const nuevo = await pool.query("INSERT INTO rubrica set ?", [NuevaRubrica]);
    const Id_Rubrica = nuevo.insertId;

    if (Nivel_Desempeno_Rubrica == "3") {
        res.redirect("rubrica3/" + Id_Rubrica);
    }
    if (Nivel_Desempeno_Rubrica == "4") {
        res.redirect("rubrica4/" + Id_Rubrica);
    }
    if (Nivel_Desempeno_Rubrica == "5") {
        res.redirect("rubrica5/" + Id_Rubrica);
    }
});

/**Listar todas las Rubricas asociadas al Rut_Usuario */
router.get("/rubricas", async(req, res) => {
    const rubricas = await pool.query(
        "Select *, Id_Rubrica FROM rubrica WHERE Rut_Usuario=?", [req.user.Rut_Usuario]
    );

    console.log(rubricas.Id_Rubrica);

    res.render("cursos/vista_rubricas", { rubricas });
});
/**Guarda los criterios de una rubrica en  la BD */
router.post("/guardarCriterio/:Id_Rubrica", async(req, res) => {
    const { Descripcion_Criterio, Descripcion_Desempeno } = req.body;
    const { Id_Rubrica } = req.params;

    const tamano_rubrica = await pool.query(
        "SELECT Nivel_Desempeno_Rubrica FROM rubrica WHERE Id_Rubrica = ?", [Id_Rubrica]
    );
    console.log(tamano_rubrica[0].Nivel_Desempeno_Rubrica);


    /**Para rubricas de tamaño 3 */
    if (tamano_rubrica[0].Nivel_Desempeno_Rubrica == "3") {
        /**almacena el contenido de la rubrica en la BD */

        var te = 3;
        var e = 0;
        for (var i in Descripcion_Criterio) {
            const nuevoCriterio = await pool.query(
                "INSERT INTO criteriosRubrica (Descripcion_Criterio,Id_Rubrica ) values (?,?)", [Descripcion_Criterio[i], Id_Rubrica]
            );
            const Id_Criterio = nuevoCriterio.insertId;
            while (e < te) {
                await pool.query(
                    "INSERT INTO nivel_desempeno (Descripcion_Desempeno,Nivel_Desempeno,Id_Criterio ) values (?,?,?)", [Descripcion_Desempeno[e], e, Id_Criterio]
                );
                e = e + 1;
            }
            te = te + 3;
        }
    }
    /**Para rubricas de tamaño 4 */
    if (tamano_rubrica[0].Nivel_Desempeno_Rubrica == "4") {
        /**almacena el contenido de la rubrica en la BD */

        var te = 4;
        var e = 0;
        for (var i in Descripcion_Criterio) {
            const nuevoCriterio = await pool.query(
                "INSERT INTO criteriosRubrica (Descripcion_Criterio,Id_Rubrica ) values (?,?)", [Descripcion_Criterio[i], Id_Rubrica]
            );
            const Id_Criterio = nuevoCriterio.insertId;
            while (e < te) {
                await pool.query(
                    "INSERT INTO nivel_desempeno (Descripcion_Desempeno,Nivel_Desempeno,Id_Criterio ) values (?,?,?)", [Descripcion_Desempeno[e], e, Id_Criterio]
                );
                e = e + 1;
            }
            te = te + 4;
        }
    }

    /**Para rubricas de tamaño 4 */
    if (tamano_rubrica[0].Nivel_Desempeno_Rubrica == "5") {
        /**almacena el contenido de la rubrica en la BD */

        var te = 5;
        var e = 0;
        for (var i in Descripcion_Criterio) {
            const nuevoCriterio = await pool.query(
                "INSERT INTO criteriosRubrica (Descripcion_Criterio,Id_Rubrica ) values (?,?)", [Descripcion_Criterio[i], Id_Rubrica]
            );
            const Id_Criterio = nuevoCriterio.insertId;
            while (e < te) {
                await pool.query(
                    "INSERT INTO nivel_desempeno (Descripcion_Desempeno,Nivel_Desempeno,Id_Criterio ) values (?,?,?)", [Descripcion_Desempeno[e], e, Id_Criterio]
                );
                e = e + 1;
            }
            te = te + 5;
        }
    }

    res.redirect("/rubrica/mostrarRubrica/" + Id_Rubrica);
});

/**Funcion para mostrar la Rúbrica */
router.get("/mostrarRubrica/:Id_Rubrica", async(req, res) => {
    /**Rescatamos el Id de la Rúbrica desde la URL */
    const { Id_Rubrica } = req.params;

    const todo = await pool.query(
        "SELECT * FROM nivel_desempeno LEFT JOIN  criteriosrubrica USING(Id_Criterio) LEFT JOIN rubrica USING (Id_Rubrica) WHERE Id_Rubrica= ?", [Id_Rubrica]
    );
    console.log(todo);
    /**Se Consulta a la BD*/
    const rubrica = await pool.query(
        "SELECT * FROM rubrica WHERE Id_Rubrica = ?", [Id_Rubrica]
    );
    const criterio = await pool.query(
        "SELECT * FROM criteriosrubrica WHERE Id_Rubrica = ?", [Id_Rubrica]
    );
    if (criterio.length > 0) {
        const desempeno = await pool.query(
            "SELECT * FROM nivel_desempeno WHERE Id_Criterio = ?", [criterio[0].Id_Criterio]
        );
        console.log(desempeno);
        res.render("rubrica/mostrar_rubrica3", { criterio, todo, desempeno });
    } else {
        res.redirect("/rubrica/rubricas/");
    }
});

router.get("/eliminarRubrica/:Id_Rubrica", async(req, res) => {
    const { Id_Rubrica } = req.params;

    const criterio = await pool.query("SELECT Id_Criterio FROM criteriosrubrica WHERE Id_Rubrica = ?", [Id_Rubrica]);
    console.log(criterio);

    for (var i in criterio) {

        await pool.query("DELETE FROM nivel_desempeno WHERE Id_Criterio = ?", [criterio[i].Id_Criterio]);
        await pool.query("DELETE FROM criteriosrubrica WHERE Id_Criterio = ?", [criterio[i].Id_Criterio]);
    }

    await pool.query("DELETE FROM rubrica WHERE Id_Rubrica = ?", [Id_Rubrica]);
    res.redirect("/rubrica/rubricas/");

});

module.exports = router;