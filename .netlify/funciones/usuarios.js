/*var express = require('express');
var cors = require("cors");
var serverless = require ('serverless-http');
var port = process.env.PORT || 5000;
var app = express();
var usuroutes = require("../../backend/routes/usuariosrutas.js");
 
//Ejemplo de función con manejo posterior de persistencia
//segundo comentario 
 
app.use(express.json());
app.use(cors());
 
var router = express.Router();
router.use ("/usuarios",usuroutes);
 
//var handler = app.use('/.netlify/functions/usuarios', usuroutes);

//app.use('/.netlify/functions/usuarios', usuroutes);
//var handler = app.use ('/.netlify/function',router)
var handler = app.use('/.netlify/functions/usuarios', router);

// probar module.exports.handler = serverless(app);
exports.handler = serverless (app);*/

const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const usuroutes = require("../../backend/routes/usuariosrutas.js");

const app = express();
app.use(cors());
app.use(express.json());

// Monta directamente el router
app.use("/", usuroutes);

module.exports.handler = serverless(app);
