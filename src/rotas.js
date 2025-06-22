import { Router } from "express";
import UsuariosController from "./controllers/usuarios.js";
import { camposUsuarios, emailSenha } from "./middlewares/JOI/schemas.js";
import {
	validarCorpoRequisicao,
	verificarEmailExistente,
} from "./middlewares/validacao.js";

const routes = Router();

routes.post(
	"/usuarios",
	validarCorpoRequisicao(camposUsuarios),
	verificarEmailExistente,
	UsuariosController.cadastrarUsuario,
);

routes.post(
	"/login",
	validarCorpoRequisicao(emailSenha),
	UsuariosController.login,
);
routes.get("/usuarios", UsuariosController.listarUsuarios);

export default routes;
