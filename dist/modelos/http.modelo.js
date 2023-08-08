"use strict";
const express = require('express');
const { main } = require('../rutas/ruta_http.ts');
class Server {
    constructor(port = 3000) {
        this.server = express();
        this.port = port;
        this.load();
    }
    routes() {
        // Esto carga el archivo de rutas principal.
        this.server.use('/', Main);
    }
    middlewares() {
        // Esto para leer datos desde el cuerpo.
        this.server.use(express.json());
    }
    load() {
        this.middlewares();
        this.routes();
        this.start();
    }
    start() {
        this.server.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}.`);
        });
    }
}
module.exports = Server;
