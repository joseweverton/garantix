import Joi from "joi";

import {
	email,
	funcao,
	nivel_acesso_id,
	nome,
	senha,
	situacao,
} from "./variaveis.js";

const validarCamposUsuarios = Joi.object({
	nome,
	email,
	senha,
	funcao,
	situacao,
	nivel_acesso_id,
});

export default validarCamposUsuarios;
