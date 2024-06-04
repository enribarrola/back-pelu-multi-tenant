import { Bancos } from "../intefaces/bancos";
import {db} from "../database";
import { QueryResult } from "pg";
export const BancosModelo = {
	
 async obtenerBancos() : Promise<Bancos[]> {
	try {
		const sql = `select cb.id_cuenta, cb.tipo_cuenta, b.nombre, cb.numero_cuenta, cb.saldo from cuentas_bancarias cb 
		inner join bancos b on cb.id_banco = b.id_banco 
		where cb.es_empresa = true limit 10`;
		const result:QueryResult = await db.query(sql);
		return result.rows;
	} catch (error: any) {				
		throw new Error(error.message);
	}
 },
 async obtenerBanco(id:number) : Promise<Bancos[]> {
	try {
		const sql = `select cb.id_cuenta, cb.tipo_cuenta, b.nombre, cb.numero_cuenta, cb.saldo from cuentas_bancarias cb 
		inner join bancos b on cb.id_banco = b.id_banco 
		where cb.es_empresa = true and cb.id_cuenta = $1`;
		const result:QueryResult = await db.query(sql,[id]);
		return result.rows[0];
	} catch (error: any) {				
		throw new Error(error.message);
	}
 },
 async obtenerMovimientosBanco(id:number) : Promise<Bancos[]> {
	try {
		const sql = `select to_char(tb.fecha_transferencia,'DD/MM/YYYY HH:MM') as fecha_transferencia, tb.comprobante, tb.monto, tm.descripcion as tipo_movimiento, tb.descripcion from movimientos m 
		inner join transferencias_bancarias tb ON tb.id_movimiento = m.id_movimiento
		inner join tipo_movimientos tm ON tm.id_tipo_movimiento = m.id_tipo_movimiento 
		inner join cuentas_bancarias cb on cb.id_cuenta = tb.id_cuenta_beneficiario 
		where tb.id_cuenta_beneficiario = $1 or tb.id_cuenta_emisor = $2 limit 10`;
		const result:QueryResult = await db.query(sql,[id,id]);
		return result.rows;
	} catch (error: any) {				
		throw new Error(error.message);
	}
 }
}