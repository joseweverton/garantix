import { Router } from "express";
import UsuariosController from "./controllers/usuarios.js";
import intermediarioUsaurios from "./middlewares/intermediarioUsaurios.js";

const routes = Router();

routes.post(
	"/usuarios",
	intermediarioUsaurios.validarNome,
	intermediarioUsaurios.validarEmail,
	UsuariosController.cadastrarUsuario,
);
routes.get("/usuarios", UsuariosController.listarUsuarios);

export default routes;
