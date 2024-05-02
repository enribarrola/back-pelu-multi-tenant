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
		const id = req.params.id;
		const result = await ClienteModelo.obtenerPorCi(id);
		if(result == undefined || result.length == 0){
			throw new Error("No se encontro el cliente");
		}
		res.status(200).json(result);
	} catch (error: any) {
		res.status(404).json(error.message);
	}
}

export const obtenerClientes = async (req: Request, res: Response) => {
	try {
		const { page } = req.query;
  		const pageNumber = parseInt(page as string) || 1; // Página predeterminada: 1
 		const limit = 10; // Límite de resultados por página
		const paginacion:Paginacion = { limit, offset: (pageNumber - 1) * limit };
		const total = await ClienteModelo.countTotalCliente(limit);
		const result = await ClienteModelo.obtenerClientes(paginacion);
		if(result == undefined){
			throw new Error("No se encontro el cliente");
		}
		res.status(200).json({page: pageNumber, totalPages: total, result});
	} catch (error: any) {
		res.status(404).json(error.message);
	}	
}

export const obtenerFichaCliente = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const result = await ClienteModelo.obtenerFichaCliente(id);
		if(result == undefined){
			throw new Error("No se encontro el cliente");
		}
		res.status(200).json(result);
	} catch (error: any) {
		res.status(404).json(error.message);
	}
}
