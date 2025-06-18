import { Router } from "express";
import UsuariosController from "./controllers/usuarios.js";

const routes = Router();

routes.post("/usuarios", UsuariosController.cadastrarUsuario);
routes.get("/usuarios", UsuariosController.listarUsuarios);

export default routes;
