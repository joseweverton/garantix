import Joi from "joi";

import {
	email,
	funcao,
	nivel_acesso_id,
	nome,
	senha,
	senhaLogin,
	situacao,
} from "./variaveis.js";

export const camposUsuarios = Joi.object({
	nome,
	email,
	senha,
	funcao,
	situacao,
	nivel_acesso_id,
});

export const emailSenha = Joi.object({
	email,
	senha: senhaLogin,
});

//export default validarCamposUsuarios;
