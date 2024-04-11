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
exports.obtenerPorCi = exports.createClient = void 0;
const cliente_1 = require("../models/cliente");
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const result = yield cliente_1.ClienteModelo.insert(body);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(404).json(error.message);
    }
});
exports.createClient = createClient;
const obtenerPorCi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield cliente_1.ClienteModelo.obtenerPorCi(id);
        if (result == undefined) {
            throw new Error("No se encontro el cliente");
        }
        res.status(200).json(result);
    }
    catch (error) {
        res.status(404).json(error.message);
    }
});
exports.obtenerPorCi = obtenerPorCi;
