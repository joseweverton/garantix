import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import knex from "../model/conexao.js";
const cadastrarUsuario = async (req, res) => {
	const { nome, email, senha, funcao, situacao, nivel_acesso_id } = req.body;
	try {
		const senhaCriptografada = await bcrypt.hash(senha, 10);

		const usuario = await knex("usuarios")
			.insert({
				nome,
				email,
				senha: senhaCriptografada,
				funcao,
				situacao,
				nivel_acesso_id,
			})
			.returning([
				"id",
				"nome",
				"email",
				"funcao",
				"situacao",
				"nivel_acesso_id",
			]);

		if (!usuario[0]) {
			return res.status(400).json("Usuário não foi cadastrado");
		}
		const { senha: _, ...usuarioCadastrado } = usuario[0];
		return res.status(201).json(usuarioCadastrado);
	} catch (error) {
		//console.error("Erro ao cadastrar usuário:", error); // debugar erro

		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};

const DetalharPerfilUsuarios = async (req, res) => {
	try {
		const { email } = req.usuario;
		const detalharUsuario = await knex("usuarios")
			.join("niveis_acesso", "usuarios.nivel_acesso_id", "niveis_acesso.id")
			.where("usuarios.email", email) // <- esta linha deve estar exatamente assim
			.select(
				"usuarios.id",
				"usuarios.nome",
				"usuarios.email",
				"usuarios.funcao",
				"usuarios.situacao",
				"niveis_acesso.nome as nivel_acesso", // pega o nome do nível
				"usuarios.created_at",
				"usuarios.updated_at",
			)
			.first();

		return res.json({ detalharUsuario });
	} catch (error) {
		console.error("Erro ao buscar usuarios:", error);
		return res.status(401).json({
			mensagem:
				"Para acessar este recurso um token de autenticação deve ser enviado",
		});
	}
};

const login = async (req, res) => {
	const { email, senha } = req.body;

	try {
		const usuario = await knex("usuarios").where({ email }).first();

		if (!usuario) {
			return res
				.status(404)
				.json({ mensagem: "usuário e/ou senha inválido(s)" });
		}

		const senhaValida = await bcrypt.compare(senha, usuario.senha);

		if (!senhaValida) {
			return res
				.status(400)
				.json({ mensagem: "usuário e/ou senha inválido(s)" });
		}

		const token = jwt.sign({ id: usuario.id }, process.env.JWT_PASS, {
			expiresIn: "8h",
		});

		const { senha: _, ...usuarioLogado } = usuario;
		req.usuario = usuario;
		return res.json({ usuario: usuarioLogado, token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			mensagem: "Erro interno do servidor",
		});
	}
};

export default {
	cadastrarUsuario,
	login,
	DetalharPerfilUsuarios,
};
