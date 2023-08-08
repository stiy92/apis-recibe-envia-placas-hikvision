"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const camaraRoutes = (0, express_1.Router)();
//===========================ruta post donde inicia el proceso de los datos recibidos y enviados
camaraRoutes.post('/create', (req, res) => {
    // funcion Domparser funciono gracias a Dios ===========================================
    const { DOMParser } = require('xmldom');
    req.once('data', function (chunk) {
        var abc = chunk;
        var b3 = Buffer.from(abc);
        // var datos_camara =b3.slice(170, 708).toString();
        var datos_camara = b3.slice(250, 799).toString();
        res.send("Recivido"); //debo de comentar esto
        //nueva estancia de Domparser y combertirlo en xml para sacar los datos por tag
        const doc = new DOMParser().parseFromString(`<camara>` + datos_camara + `</camara>`);
        //===================proceso para enviar los datos tomados por el buffer=================================
        var nodos = doc.getElementsByTagName("camara")[0].childNodes;
        for (let i = 0; i < nodos.length; i++) {
            //if para la placa
            if (nodos[i].nodeName == 'licensePlate') { //sólo nodos tipo "element" (Type=1)
                var nombre = nodos[i].nodeName; //Nombre de la etiqueta
                var valor = nodos[i].childNodes[0].nodeValue; //texto de la etiqueta
            }
            //  // if para la ip
            //  if (nodos[i].nodeName=='ipAddress') { //sólo nodos tipo "element" (Type=1)
            //    var nombre=nodos[i].nodeName; //Nombre de la etiqueta
            //    var ip=nodos[i].childNodes[0].nodeValue; //texto de la etiqueta
            //     }
            //     // if para id
            //     if (nodos[i].nodeName=='channelID') { //sólo nodos tipo "element" (Type=1)
            //       var nombre=nodos[i].nodeName; //Nombre de la etiqueta
            //       var id=nodos[i].childNodes[0].nodeValue; //texto de la etiqueta
            //        }
            // if para fecha
            if (nodos[i].nodeName == 'dateTime') { //sólo nodos tipo "element" (Type=1)
                var nombre = nodos[i].nodeName; //Nombre de la etiqueta
                var fecha = nodos[i].childNodes[0].nodeValue; //texto de la etiqueta
            }
            //           //if para confidence
            //        if (nodos[i].nodeName=='confidenceLevel') { //sólo nodos tipo "element" (Type=1)
            //          var nombre=nodos[i].nodeName; //Nombre de la etiqueta
            //          var confidence=nodos[i].childNodes[0].nodeValue; //texto de la etiqueta
            //           }
        }
        // parte donde puedo capturar los datos por separado
        const camaras = {
            placa: valor,
            fecha: fecha,
        };
        // console.log(camaras)
        const sqlConnection = require("../database/conection");
        //camara principal metodo que guarda los datos al estanciar la conecion estoy haciendo el llamado de una de sus metodos y le envio la placa y la fecha como parametro para que realice le registro a la base de datos
        sqlConnection.agregarCamara(camaras.placa, camaras.fecha);
        //=============================================================================================================
    });
});
//================================================fin de la ruta===============================================================================
exports.default = camaraRoutes;
