import jwt from "jsonwebtoken";
import knex from "../model/conexao.js";

const autenticacaoLogin = async (req, res, next) => {
	const { authorization } = req.headers; //onde vem o bearer token

	if (!authorization) {
		return res.status(401).json({ mensagem: "Usuário não autorizado" });
	}

	try {
		const token = authorization.split(" ")[1];
		// verify: verifica a validade do token e assina com a chave secreta. Se for valido vai retornar o payload e dentro dele o id do usuario
		const { id } = jwt.verify(token, process.env.JWT_PASS);
		//select * from usuarios where id = $1, [id]
		const usuarioEncontrado = await knex("usuarios").where({ id }).first();

		if (!usuarioEncontrado) {
			return res.status(401).json({ mensagem: "Usuario não autorizado" });
		}
		const { senha, ...usuario } = usuarioEncontrado;

		req.usuario = usuario;
		next();
	} catch (error) {
		return res.status(401).json({ mensagem: "Usuário não autorizado" });
	}
};

export default autenticacaoLogin;
