"use strict";
const { setIpServer } = require('../controllers/setServerIp.controller');
const Main = require('express').Router();
Main.get('/server/:172.30.92.44', setIpServer);
// Esto envía los archivos estáticos.
//Main.use('/', static(`${process.cwd()}/backend/public/`));
// Esto es por si usas Angular, para que sea cual sea la ruta no pierdas referencia.
//Main.get('*', (req, res) => res.sendFile(`${process.cwd()}/backend/public/index.html`));
module.exports = { Main };
