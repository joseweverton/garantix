import dotenv from "dotenv";
dotenv.config();
import creatKnex from "knex";

const knex = creatKnex({
	client: "pg",
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
	},
});

//console.log("Senha do banco:", process.env.DB_PASS);
//console.log("Tipo da senha:", typeof process.env.DB_PASS);

export default knex;
