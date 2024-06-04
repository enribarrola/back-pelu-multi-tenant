import { Router } from "express";
import { obtenerBanco, obtenerBancos, obtenerMovimientos } from "../controllers/bancos.controller";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();

router.get("/bancos", obtenerBancos);
router.get("/bancos/:id", obtenerBanco);
router.get("/bancos/movimientos/:id", obtenerMovimientos);


export default router;