/*
const express = require("express");
const router = express.Router();
const usuariosmodel = require("../modelo/usuariosmodelo.js");
 
router.get("/",usuariosmodel.consultarDetalle);
router.post("/",usuariosmodel.ingresar);
 
/* Ejemplo con parámetros */
 
router.route("/:iden")
.get(usuariosmodel.consultarDetalle);
/*
.put(usuarioscontroller.actualizar)
.delete(usuarioscontroller.borrar);
*/
 
//module.exports = router;

const express = require("express");
const router = express.Router();
const usuariosmodel = require("../modelo/usuariosmodelo.js");

// Ruta GET para consultar con query parameter (?iden=valor)
router.get("/", (req, res, next) => {
    if (req.query.iden) {
        // Si viene como query parameter
        req.params = { iden: req.query.iden }; // Adaptamos para el modelo
        return usuariosmodel.consultarDetalle(req, res, next);
    }
    return res.status(400).json({ 
        error: "Parámetro requerido",
        message: "Debe proporcionar el parámetro 'iden'",
        ejemplo: "/usuarios?iden=123 o /usuarios/123" 
    });
});

// Ruta POST para crear nuevos usuarios
router.post("/", usuariosmodel.ingresar);

// Ruta GET alternativa con parámetro en el path
router.get("/:iden", usuariosmodel.consultarDetalle);

module.exports = router;