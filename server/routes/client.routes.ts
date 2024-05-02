import { Router } from "express";
import { createClient,obtenerPorCi,obtenerClientes,obtenerFichaCliente } from "../controllers/client.controller";
const router = Router();

router.post("/cliente", createClient);
router.get("/cliente/:id", obtenerPorCi)
router.get("/cliente", obtenerClientes)
router.get("/cliente/ficha/:id", obtenerFichaCliente)

export default router;
