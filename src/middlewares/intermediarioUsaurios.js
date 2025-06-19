const validarNome = async (req, res, next) => {
	const { nome } = req.body;
	if (!nome) {
		return res.status(400).json({ mensagem: "nome obrigatorio" });
	}
	if (typeof nome !== "string") {
		return res.status(400).json({ mensagem: "nome precisa ser uma string" });
	}
	next();
};

const validarEmail = async (req, res, next) => {
	const { email } = req.body;
	if (!email) {
		return res.status(400).json({ mensagem: "email obrigatorio" });
	}
	next();
};

export default {
	validarNome,
	validarEmail,
};
