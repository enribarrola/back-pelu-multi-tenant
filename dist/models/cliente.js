"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteModelo = void 0;
const database_1 = require("../database");
exports.ClienteModelo = {
    insert(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO clientes (contribuyente, razon_social, pais, correo_electronico, tipo_contribuyente, documento_tipo, nro_documento, celular, fecha_nacimiento, ruc, tipo_operacion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
                const { contribuyente, razonSocial, nacionalidad, correo, tipoContribuyente, tipoDocumento, numeroDocumento, numeroTelefono, fechaNacimiento, RUC, tipoOperacion } = body;
                const values = [contribuyente, razonSocial, nacionalidad, correo, tipoContribuyente, tipoDocumento, numeroDocumento, numeroTelefono, fechaNacimiento, RUC, tipoOperacion];
                const result = yield database_1.db.query(sql, values);
                return result.rows[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    obtenerPorCi(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM clientes WHERE nro_documento = $1`;
                const result = yield database_1.db.query(sql, [id]);
                return result.rows[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
};
