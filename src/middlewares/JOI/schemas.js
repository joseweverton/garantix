import Joi from "joi";

import {
	email,
	funcao,
	nivel_acesso_id,
	nome,
	senha,
	situacao_id,
} from "./variaveis.js";

const validarCamposUsuarios = Joi.object({
	nome,
	email,
	senha,
	funcao,
	situacao_id,
	nivel_acesso_id,
});

export default validarCamposUsuarios;
