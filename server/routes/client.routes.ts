import { Router } from "express";
import { createClient,obtenerPorCi } from "../controllers/client.controller";
const router = Router();

router.post("/create-client", createClient);
router.get("/get-client/:id", obtenerPorCi)

export default router;
