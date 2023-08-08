// esto es para manejara las variables de entorno
/*import { config } from "dotenv";

config();

// si existe el puerto uselo si no use este puerto
export default {
    port: process.env.PORT || 80
}*/


//BASE DE DATOS PRUEBA PARA ANPR EN PANTERA
const dbpantera = {

    user: 'sa',
    password: 'root',
    port: 36934,
    server: '172.30.200.200',
    database: 'venus_opp_prueba_02122020',
    options : {
    encrypt: true,
    trustServerCertificate: true,
    // trustedconnection : false,
    // enableArithAbort : true,
    },

};

const dbccarga = {

    user: 'user',
    password: 'contraña',
    port: 3341,
    server: 'direcion ip',
    database: 'datbase',
    options : {
    encrypt: true,
    trustServerCertificate: true,
    // trustedconnection : false,
    // enableArithAbort : true,
    },

};


module.exports = dbpantera;


