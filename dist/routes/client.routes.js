"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_controller_1 = require("../controllers/client.controller");
const router = (0, express_1.Router)();
router.post("/create-client", client_controller_1.createClient);
router.get("/get-client/:id", client_controller_1.obtenerPorCi);
exports.default = router;
