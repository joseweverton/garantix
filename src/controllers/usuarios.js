import bcrypt from "bcrypt";
import knex from "../model/conexao.js";
const cadastrarUsuario = async (req, res) => {
	const { nome, email, senha, funcao, situacao_id, nivel_acesso_id } = req.body;
	try {
		const senhaCriptografada = await bcrypt.hash(senha, 10);

		// Verificação de inicidade de e-mail antes de enviar para o banco
		const usuarioExistente = await knex("usuarios").where({ email }).first();
		if (usuarioExistente) {
			return res
				.status(400)
				.json({ mensagem: "O e-mail informado já está em uso." });
		}
		//persistindo no banco os dados da requisição
		const usuario = await knex("usuarios")
			.insert({
				nome,
				email,
				senha: senhaCriptografada,
				funcao,
				situacao_id,
				nivel_acesso_id,
			})
			.returning([
				"id",
				"nome",
				"email",
				"funcao",
				"situacao_id",
				"nivel_acesso_id",
			]);

		if (!usuario[0]) {
			return res.status(400).json("Usuário não foi cadastrado");
		}
		const { senha: _, ...usuarioCadastrado } = usuario[0];
		return res.status(201).json(usuarioCadastrado);
	} catch (error) {
		console.error("Erro ao cadastrar usuário:", error); // Ajuda no debug

		// Violação de restrição de unicidade (e.g., e-mail já cadastrado)
		if (error.code === "23505") {
			return res
				.status(400)
				.json({ mensagem: "O e-mail informado já está cadastrado." });
		}
		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};

const listarUsuarios = async (req, res) => {
	try {
		const resultado = await knex("usuarios");
		return res.json(resultado);
	} catch (error) {
		console.error("Erro ao buscar usuarios:", error);
		return res.status(500).json({ error: error.message });
	}
};

export default {
	cadastrarUsuario,
	listarUsuarios,
};
