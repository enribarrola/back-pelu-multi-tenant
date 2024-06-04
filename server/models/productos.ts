import {db} from "../database";
import { QueryResult } from "pg";
import { ProductosModelos } from "../intefaces/productos";

export const productosModelos = {
	
	async obtenerProductosFiltro(servicio:string) : Promise<ProductosModelos[]> {
	   try {
		   const sql = `select * from servicios s where lower(s.nombre_servicio) like lower($1) limit 5`;
		   const result:QueryResult = await db.query(sql,[`%${servicio}%`]);
		   return result.rows;
	   } catch (error: any) {				
		   throw new Error(error.message);
	   }
	}
}