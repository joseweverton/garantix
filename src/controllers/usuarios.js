import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import knex from "../model/conexao.js";
const cadastrarUsuario = async (req, res) => {
	const { nome, email, senha, admin, situacao, nivel_acesso_id } = req.body;
	try {
		const senhaCriptografada = await bcrypt.hash(senha, 10);

		const usuario = await knex("usuarios")
			.insert({
				nome,
				email,
				senha: senhaCriptografada,
				admin,
				situacao,
				nivel_acesso_id,
			})
			.returning(["id", "nome", "email", "admin", "situacao", "nivel_acesso_id"]);

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
			.where("usuarios.email", email)
			.select("usuarios.id", "usuarios.nome", "usuarios.email", "usuarios.admin", "usuarios.situacao", "niveis_acesso.nome as nivel_acesso", "usuarios.created_at", "usuarios.updated_at")
			.first();

		return res.json({ detalharUsuario });
	} catch (error) {
		console.error("Erro ao buscar usuarios:", error);
		return res.status(401).json({
			mensagem: "Para acessar este recurso um token de autenticação deve ser enviado",
		});
	}
};

const login = async (req, res) => {
	const { email, senha } = req.body;

	try {
		const usuario = await knex("usuarios").where({ email }).first();

		if (!usuario) {
			return res.status(404).json({ mensagem: "usuário e/ou senha inválido(s)" });
		}

		const senhaValida = await bcrypt.compare(senha, usuario.senha);

		if (!senhaValida) {
			return res.status(400).json({ mensagem: "usuário e/ou senha inválido(s)" });
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

const editarSenha = async (req, res) => {
	const { senha } = req.body;
	try {
		const usuario = await knex("usuarios").where("id", req.usuario.id).first();

		if (!usuario) {
			return res.status(404).json({ Mensagem: "Usuário não encontrado" });
		}

		const senhaAtual = await bcrypt.compare(senha, usuario.senha);
		if (senhaAtual) {
			return res.status(400).json({ mensagem: "A nova senha não pode ser igual à senha atual." });
		}

		const senhaCriptografada = await bcrypt.hash(senha, 10);

		const dadosAtualizados = await knex("usuarios").where("id", req.usuario.id).update({
			senha: senhaCriptografada,
			updated_at: knex.fn.now(), //Fuso UTC idêntico do banco
		});
		res.status(200).json({
			mensagem: "Senha atualizada com sucesso!",
		});
	} catch (error) {
		res.status(500).json({ mensagem: "Erro no servidor ao atualizar senha - Entre em contato com administrador" });
	}
};

const editarPerfilUsuario = async (req, res) => {
	const { id } = req.params;
	const { nome, email, senha, admin, situacao, nivel_acesso_id } = req.body;
	try {
		const senhaCriptografada = await bcrypt.hash(senha, 10);
		const usuarioAtualizado = await knex("usuarios").where("id", id).update({ nome, email, senha: senhaCriptografada, admin, situacao, nivel_acesso_id, updated_at: knex.fn.now() }, "*");

		if (!usuarioAtualizado[0]) {
			return res.status(404).json({ mensagem: "Dados do usuário  não eonctrado" });
		}

		return res.status(201).json(usuarioAtualizado);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ mensagem: error.message });
	}
};
export default {
	cadastrarUsuario,
	login,
	DetalharPerfilUsuarios,
	editarSenha,
	editarPerfilUsuario,
};
