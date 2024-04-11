import { Router } from "express";
import { loginHandler } from "../controllers/auth.controller";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();

router.post("/login", loginHandler);

router.get("/profile", requireAuth);

export default router;
