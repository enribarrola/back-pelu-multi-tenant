import { cliente, fichaCliente } from "../intefaces/client/createClient";
import {db} from "../database";
import { QueryResult } from "pg";
export const ClienteModelo = {
 async insert(body: cliente) : Promise<cliente> {
	try {

		const sql = `INSERT INTO clientes (contribuyente, razon_social, pais, correo_electronico, tipo_contribuyente, documento_tipo, nro_documento, celular, fecha_nacimiento, ruc, tipo_operacion, fantasia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;
		const { contribuyente, razon_social, pais, correo_electronico, tipo_contribuyente, documento_tipo, nro_documento, celular, fecha_nacimiento, RUC, tipo_operacion, fantasia } = body ;
		const values:any = [contribuyente, razon_social, pais, correo_electronico, tipo_contribuyente, documento_tipo, nro_documento, celular, fecha_nacimiento, RUC, tipo_operacion,fantasia];
		
		const result:QueryResult = await db.query(sql, values);
		return result.rows[0];
	} catch (error: any) {				
		throw new Error(error.message);
	}
 },
 async obtenerPorCi(id: string) : Promise<cliente[]> {
	try {
		var result:QueryResult;
		if (!isNaN(Number(id))){
			const sql = `SELECT * FROM clientes WHERE nro_documento = $1 or id_cliente = $2`;
			result = await db.query(sql, [id,id]);
			return result.rows[0];
		}else{
			const sql = `SELECT * FROM clientes WHERE lower(fantasia) like lower($1) limit 5`;
			result = await db.query(sql, [`%${id}%`]);
			return result.rows;
		}
		
	} catch (error: any) {
		throw new Error(error.message);
	}
 },
 async obtenerClientes(paginacion:Paginacion) : Promise<cliente[]> {
	try {
		const sql = `SELECT * FROM clientes OFFSET $1 LIMIT $2`;
		const result:QueryResult = await db.query(sql, [paginacion.offset, paginacion.limit]);
		return result.rows;
	} catch (error: any) {
		throw new Error(error.message);
	}
 },
 async obtenerFichaCliente(id: number) : Promise<fichaCliente[]> {
	try {
		const sql = `select to_char(v.fecha_venta ,'dd/mm/yyyy') as fecha, s.nombre_servicio, vd.precio_unitario as precio
		from venta_detalles vd 
		inner join ventas v on v.id_venta = vd.id_venta 
		inner join servicios s on s.id_servicio = vd.id_servicio
		where v.id_cliente = $1 and s.id_tipo_servicio = 1 order by v.fecha_venta desc limit 20`;
		const result:QueryResult = await db.query(sql, [id]);
		return result.rows;
	} catch (error: any) {
		throw new Error(error.message);
	}
 },
 async countTotalCliente(limit:number) : Promise<number> {
	try {
		const sql = `select count(*) as total from clientes`;
		const result:QueryResult = await db.query(sql);
		const total = Math.ceil(result.rows[0].total / limit);
		return total;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
}
