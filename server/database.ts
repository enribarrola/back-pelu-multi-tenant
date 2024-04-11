import { Pool  } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

export const db = new Pool({
	host: process.env.DB_HOST,
	port: process.env.PORT_DB? parseInt(process.env.PORT_DB) : 5432,
	database: process.env.DATABASE,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
})
db.connect().then(() => {
	console.log('Conectado a la base de datos');
}).catch(error => {
	console.log(error);
});

