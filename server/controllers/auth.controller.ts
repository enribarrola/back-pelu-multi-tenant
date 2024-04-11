import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {db} from "../database";
import { QueryResult } from "pg";
import dotenv from 'dotenv'
dotenv.config()
export const loginHandler = async (req: Request, res: Response) => {
	try {
		const sql = `select usuario, array_agg(r.rol_nombre) as roles from usuarios u 
		join usuarios_roles ur on u.id_usuario = ur.id_usuario 
		join roles r on ur.id_rol = r.id_rol
		where u.usuario = $1 and u.contraseña = $2 
		group by u.usuario`;
		const { usuario, contraseña } = req.body;
		
		const result: QueryResult = await db.query(sql, [usuario, contraseña]);
	
		
		const token = jwt.sign(
			{
			user: result.rows[0].usuario,
			roles: result.rows[0].roles
			},
			process.env.SECRET_KEY? process.env.SECRET_KEY : 'secret',
			{
			expiresIn: 60 * 60 * 24, // 24 hours
			}
		);
	
		return res.status(200).json({
			token,
			roles: result.rows[0].roles
		});
	} catch (error: any) {
		res.status(500).json({ error: error.message });
		
	}
	
};


