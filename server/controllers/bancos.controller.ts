import { Request, Response } from "express";
import {BancosModelo} from "../models/bancos";


export const obtenerBancos = async (req: Request, res: Response) => {
	try {
		const result = await BancosModelo.obtenerBancos();
		res.status(200).json(result);
	} catch (error: any) {
		res.status(404).json(error.message);
	}
}

export const obtenerBanco = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		if (isNaN(id)) {
			throw new Error("El id debe ser un número");
		}
		const result = await BancosModelo.obtenerBanco(id);
		res.status(200).json(result);
	} catch (error: any) {
		res.status(404).json(error.message);
	}
}

export const obtenerMovimientos = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		if (isNaN(id)) {
			throw new Error("El id debe ser un número");
		}
		const result = await BancosModelo.obtenerMovimientosBanco(id);
		res.status(200).json(result);
	} catch (error: any) {
		res.status(404).json(error.message);
	}
}