import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export const nome = Joi.string().required().messages({
	"any.required": "O campo nome é obrigatório.",
	"string.empty": "O nome campo está vazio",
	"string.base": "O campo nome precisa estar no formato de texto.",
});

export const email = Joi.string()
	.required()
	.email({ minDomainSegments: 2 })
	.messages({
		"string.email": "O campo email precisa ter um formato válido.",
		"any.required": "O campo email é obrigatório.",
		"string.empty": "O campo email é obrigatório.",
		"string.base": "O campo email precisa estar no formato de texto.",
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

export const funcao = Joi.string().required().messages({
	"any.required": "O campo função é obrigatório",
	"string.empty": "O campo função não informado",
});

export const situacao_id = Joi.number()
	.strict()
	.empty(["", "Não informado"])
	.required()
	.messages({
		"any.required": "O campo situação do usuário é obrigatório.",
		"number.base": "O campo situação do usuário deve conter apenas números.",
	});

export const nivel_acesso_id = Joi.number()
	.strict()
	.empty(["", "Não informado"])
	.required()
	.messages({
		"any.required": "O campo situação do usuário é obrigatório.",
		"number.base": "O campo situação do usuário deve conter apenas números.",
	});
