import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export const nome = Joi.string().required().messages({
	"any.required": "O campo nome é obrigatório.",
	"string.empty": "O nome campo está vazio",
	"string.base": "O campo nome precisa estar no formato de texto.",
});

export const email = Joi.string().required().email({ minDomainSegments: 2 }).messages({
	"string.email": "O campo email precisa ter um formato válido.",
	"any.required": "O campo email é obrigatório.",
	"string.empty": "O campo email é obrigatório.",
	"string.base": "O campo email precisa estar no formato de texto.",
});

export const senhaLogin = Joi.string().required().messages({
	"any.required": "O campo senha é obrigatório",
	"string.empty": "O campo senha é obrigatório",
});

//	ideal para criar um array no front para trazer os erros separadamente:
export const senha = passwordComplexity({
	min: 6,
	max: 30,
	upperCase: 1,
	numeric: 1,
	symbol: 1,
	requirementCount: 4,
})
	.required()
	.messages({
		"passwordComplexity.tooShort": "Senha: Deve conter Pelo menos 6 caracteres",
		"passwordComplexity.tooLong": "Senha: Deve conter no máximo 30 caracteres",
		"passwordComplexity.uppercase": "Senha: Deve conter uma letra maiúscula",
		"passwordComplexity.numeric": "Senha: Deve conter um número",
		"passwordComplexity.symbol": "Senha: Deve conter um caractere especial",
		"any.required": "O campo senha é obrigatório,não foi informado.",
	});

export const admin = Joi.boolean().truthy("true").falsy("false").required().messages({
	"boolean.base": "O campo admin precisa ser um Verdadeiro (Sim) ou Falso (Não)",
	"any.required": "O campo admin é obrigatorio",
});

export const situacao = Joi.boolean().truthy("true").falsy("false").required().messages({
	"boolean.base": "O campo situação precisa ser um Verdadeiro (Ativo) ou Falso (Inativo)",
	"any.required": "O campo situação do usuário é obrigatorio",
});

export const nivel_acesso_id = Joi.number().strict().empty(["", "Não informado"]).required().positive().messages({
	"any.required": "O campo situação do usuário é obrigatório.",
	"number.base": "O campo situação do usuário deve conter o ID do nivel de acesso.",
	"number.positive": "O ID do nivel de acesso deve ser positivo",
});
