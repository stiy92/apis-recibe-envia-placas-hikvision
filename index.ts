import Server from "./classes/server";
import camaraRoutes from './rutas/camaras';
import bodyParser from "body-parser";
import express from 'express';


const server = new Server();

//body parser peticiones xwwfomurlencoded
server.app.use( bodyParser.urlencoded({ extended: false}));
server.app.use( bodyParser.raw());
server.app.use( bodyParser.json());


server.app.use(express.json());

// rutas de la aplicacion para el consumo
server.app.use('/camara', camaraRoutes)


//llamado a la conection de la base de datos sql ccarga como de inicio por ser la clase index
 const sqlConnection = require("./database/conection");
 sqlConnection.getconectado();


//===================== concepto para hacer pruebas =================================
// let placa= "AAA777";
//camara principal metodo que guarda los datos
//  sqlConnection.agregarCamara(placa);
// ======================fin concepto pruebas ========================================= 

// levantar express
server.start( ()=> {
console.log(`Servidor en modo escucha corriendo en puerto ${server.port}`);
});
