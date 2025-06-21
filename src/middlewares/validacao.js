import knex from "../model/conexao.js";

export const validarCorpoRequisicao = (joiSchema) => async (req, res, next) => {
	try {
		await joiSchema.validateAsync(req.body);
		next();
	} catch (error) {
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
