import { cliente } from "../intefaces/client/createClient";
import {db} from "../database";
import { QueryResult } from "pg";
export const ClienteModelo = {
 async insert(body: cliente) : Promise<cliente> {
	try {

		const sql = `INSERT INTO clientes (contribuyente, razon_social, pais, correo_electronico, tipo_contribuyente, documento_tipo, nro_documento, celular, fecha_nacimiento, ruc, tipo_operacion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
		const { contribuyente, razonSocial, nacionalidad, correo, tipoContribuyente, tipoDocumento, numeroDocumento, numeroTelefono, fechaNacimiento, RUC, tipoOperacion } = body ;
		const values:any = [contribuyente, razonSocial, nacionalidad, correo, tipoContribuyente, tipoDocumento, numeroDocumento, numeroTelefono, fechaNacimiento, RUC, tipoOperacion];
		
		const result:QueryResult = await db.query(sql, values);
		return result.rows[0];
	} catch (error: any) {				
		throw new Error(error.message);
	}
 },
 async obtenerPorCi(id: number) : Promise<cliente> {
	try {
		const sql = `SELECT * FROM clientes WHERE nro_documento = $1`;
		const result:QueryResult = await db.query(sql, [id]);
		return result.rows[0];
	} catch (error: any) {
		throw new Error(error.message);
	}
 }
}
