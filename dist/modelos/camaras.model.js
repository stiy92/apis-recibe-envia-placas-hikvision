"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camara = void 0;
const mongoose_1 = require("mongoose");
const camaraSchema = new mongoose_1.Schema({
    placa: {
        type: String
    },
    ip_camara: {
        type: String
    },
    id_camara: {
        type: String
    },
    fecha: {
        type: Date
    }
});
exports.Camara = (0, mongoose_1.model)('Camara', camaraSchema);
