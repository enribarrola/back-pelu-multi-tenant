import { Request, Response } from "express";
import {empleadosModelos} from "../models/empleados";


export const obtenerEmpleados = async (req: Request, res: Response) => {
	try {
		const result = await empleadosModelos.obtenerEmpleados();
		res.status(200).json(result);
	} catch (error: any) {
		res.status(404).json(error.message);
	}
}