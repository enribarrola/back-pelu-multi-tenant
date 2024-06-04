import express from "express";
import morgan from "morgan";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import clientRoutes from "./routes/client.routes";
import bancosRoutes from "./routes/bancos.routes";
import productosRoutes from "./routes/productos.routes";
import empleadosRoutes from "./routes/empleados.routes";

const app = express();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/api", clientRoutes);
app.use("/api", bancosRoutes);
app.use("/api", productosRoutes);
app.use("/api", empleadosRoutes)

export default app;
