"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const camaras_1 = __importDefault(require("./rutas/camaras"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const server = new server_1.default();
//body parser peticiones xwwfomurlencoded
server.app.use(body_parser_1.default.urlencoded({ extended: false }));
server.app.use(body_parser_1.default.raw());
server.app.use(body_parser_1.default.json());
server.app.use(express_1.default.json());
// rutas de la aplicacion para el consumo
server.app.use('/camara', camaras_1.default);
//llamado a la conection de la base de datos sql ccarga como de inicio por ser la clase index
const sqlConnection = require("./database/conection");
sqlConnection.getconectado();
//===================== concepto para hacer pruebas =================================
// let placa= "AAA777";
//camara principal metodo que guarda los datos
//  sqlConnection.agregarCamara(placa);
// ======================fin concepto pruebas ========================================= 
// levantar express
server.start(() => {
    console.log(`Servidor en modo escucha corriendo en puerto ${server.port}`);
});
