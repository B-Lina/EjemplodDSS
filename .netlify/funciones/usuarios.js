/*

CODIGO JUANPABLO 

var express = require('express');
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
 
var handler = app.use ('/.netlify/functions/usuarios',router);
exports.handler = serverless (app);
*/

const express = require('express');
const cors = require("cors");
const serverless = require('serverless-http');

// Importar las rutas
const usuariosRoutes = require("../../backend/routes/usuariosrutas.js");

// Crear la app de Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*', // En producción, especifica tu dominio
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging middleware para debug
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});

// Montar las rutas en la ruta base
app.use('/.netlify/functions/usuarios', usuariosRoutes);

// Ruta de prueba
app.get('/.netlify/functions/usuarios/test', (req, res) => {
    res.json({ message: 'Función funcionando correctamente', timestamp: new Date().toISOString() });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    console.log('Ruta no encontrada:', req.path);
    res.status(404).json({ error: 'Ruta no encontrada', path: req.path });
});

// Exportar como función serverless
module.exports.handler = serverless(app);