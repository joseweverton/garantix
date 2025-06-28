import Joi from "joi";

import { admin, email, nivel_acesso_id, nome, senha, senhaLogin, situacao } from "./variaveis.js";

export const camposUsuarios = Joi.object({
	nome,
	email,
	senha,
	admin,
	situacao,
	nivel_acesso_id,
});

export const camposPeril = Joi.object({
	nome,
	email,
	senha,
	admin,
});

export const emailSenha = Joi.object({
	email,
	senha: senhaLogin,
});

//export default validarCamposUsuarios;
