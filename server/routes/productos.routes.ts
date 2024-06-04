import { Router } from "express";
import { obtenerProductosFiltro } from "../controllers/productos.controller";
const router = Router();

router.get("/productos/:producto", obtenerProductosFiltro)


export default router;
