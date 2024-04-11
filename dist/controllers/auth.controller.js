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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../database");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `select usuario, array_agg(r.rol_nombre) as roles from usuarios u 
		join usuarios_roles ur on u.id_usuario = ur.id_usuario 
		join roles r on ur.id_rol = r.id_rol
		where u.usuario = $1 and u.contraseña = $2 
		group by u.usuario`;
        const { usuario, contraseña } = req.body;
        const result = yield database_1.db.query(sql, [usuario, contraseña]);
        const token = jsonwebtoken_1.default.sign({
            user: result.rows[0].usuario,
            roles: result.rows[0].roles
        }, process.env.SECRET_KEY ? process.env.SECRET_KEY : 'secret', {
            expiresIn: 60 * 60 * 24, // 24 hours
        });
        return res.status(200).json({
            token,
            roles: result.rows[0].roles
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.loginHandler = loginHandler;
