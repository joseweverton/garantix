import { Router } from "express";
import UsuariosController from "./controllers/usuarios.js";
import validarCamposUsuarios from "./middlewares/JOI/schemas.js";
import validarCorpoRequisicao from "./middlewares/validacao.js";

const routes = Router();

routes.post(
	"/usuarios",
	validarCorpoRequisicao(validarCamposUsuarios),
	UsuariosController.cadastrarUsuario,
);
routes.get("/usuarios", UsuariosController.listarUsuarios);

export default routes;
