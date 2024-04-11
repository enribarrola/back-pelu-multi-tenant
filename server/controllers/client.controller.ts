import { Request, Response } from "express";
import { cliente } from "../intefaces/client/createClient";
import {ClienteModelo} from "../models/cliente";


export const createClient = async (req: Request, res: Response) => {
	try {
		const body: cliente = req.body;
		const result = await ClienteModelo.insert(body);
		res.status(200).json(result);
	} catch (error: any) {
		res.status(404).json(error.message);
	}
}

export const obtenerPorCi = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const result = await ClienteModelo.obtenerPorCi(id);
		if(result == undefined){
			throw new Error("No se encontro el cliente");
		}
		res.status(200).json(result);
	} catch (error: any) {
		res.status(404).json(error.message);
	}
}