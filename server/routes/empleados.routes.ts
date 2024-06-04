import { Router } from "express";
import { obtenerEmpleados } from "../controllers/empleados.controller";
const router = Router();

router.get("/empleados", obtenerEmpleados)


export default router;
