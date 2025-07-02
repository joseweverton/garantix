import knex from "../model/conexao.js";

export const validarCorpoRequisicao = (joiSchema) => async (req, res, next) => {
	try {
		await joiSchema.validateAsync(req.body);
		next();
	} catch (error) {
		//console.log(error); //debugar erro
		return res.status(400).json({ mensagem: error.message });
	}
};

export const verificarEmailExistente = async (req, res, next) => {
	const { email } = req.body;

	try {
		const emailExiste = await knex("usuarios").where({ email }).first();

		if (emailExiste) {
			return res.status(400).json({
				mensagem: "Já existe usuário cadastrado com o e-mail informado.",
			});
		}
		next();
	} catch (error) {
		return res.status(500).json({ mensagem: "Erro interno do servidor." });
	}
};

export const verificarPermissao = async (req, res, next) => {
	try {
		const usuario = await knex("usuarios").join("niveis_acesso", "usuarios.nivel_acesso_id", "niveis_acesso.id").where("usuarios.id", req.usuario.id).select("usuarios.admin", "niveis_acesso.nome as nivel_acesso").first();

		if (!usuario) {
			return res.status(404).json({ mensagem: "Usuário não encontrado." });
		}

		const temPermissao = usuario.admin === true || usuario.nivel_acesso.toLowerCase() === "alto";

		if (!temPermissao) {
			return res.status(403).json({ mensagem: "Acesso negado. Você não tem permissão para cadastrar novos usuários." });
		}

		next();
	} catch (error) {
		console.error("Erro no middleware de permissão:", error);
		res.status(500).json({ mensagem: "Erro interno ao verificar permissões. Contacte o administrador" });
	}
};
