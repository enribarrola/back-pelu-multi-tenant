import { Request, Response } from "express";
import { cliente } from "../intefaces/client/createClient";
import {productosModelos} from "../models/productos";


export const obtenerProductosFiltro = async (req: Request, res: Response) => {
	try {
		const producto = req.params.producto;
		const result = await productosModelos.obtenerProductosFiltro(producto);
		res.status(200).json(result);
	} catch (error: any) {
		res.status(404).json(error.message);
	}
}