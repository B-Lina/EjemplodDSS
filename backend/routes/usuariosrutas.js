const express = require("express");
const router = express.Router();
const usuariosmodel = require("../modelo/usuariosmodelo.js");
 
router.get("/",usuariosmodelo.consultarDetalle);
router.post("/",usuariosmodelo.ingresar);
 
/* Ejemplo con parámetros */
 
router.route("/:iden")
.get(usuariosmodelo.consultarDetalle);
/*
.put(usuarioscontroller.actualizar)
.delete(usuarioscontroller.borrar);
*/
 
module.exports = router;