import {db} from "../database";
import { QueryResult } from "pg";
import { EmpleadoModelos } from "../intefaces/empleados";

export const empleadosModelos = {
	
	async obtenerEmpleados() : Promise<EmpleadoModelos[]> {
	   try {
		   const sql = `select * from empleadas e where e.activa = true`;
		   const result:QueryResult = await db.query(sql);
		   return result.rows;
	   } catch (error: any) {				
		   throw new Error(error.message);
	   }
	}
}