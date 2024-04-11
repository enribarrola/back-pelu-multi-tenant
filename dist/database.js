"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.db = new pg_1.Pool({
    host: process.env.DB_HOST,
    port: process.env.PORT_DB ? parseInt(process.env.PORT_DB) : 5432,
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
exports.db.connect().then(() => {
    console.log('Conectado a la base de datos');
}).catch(error => {
    console.log(error);
});
