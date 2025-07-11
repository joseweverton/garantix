import { Router } from "express";
import { importarProcessos } from "./controllers/uploadPlanilha.js";
import UsuariosController from "./controllers/usuarios.js";
import { campoSenha, camposUsuarios, emailSenha } from "./middlewares/JOI/schemas.js";
import autenticacaoLogin from "./middlewares/autenticacao.js";
import upload from "./middlewares/upload.js";
import { validarCorpoRequisicao, verificarEmailExistente, verificarPermissao } from "./middlewares/validacao.js";

const routes = Router();

routes.post("/login", validarCorpoRequisicao(emailSenha), UsuariosController.login);
routes.post("/usuarios", validarCorpoRequisicao(camposUsuarios), verificarEmailExistente, UsuariosController.cadastrarUsuario);
// a partir daqui tem que ter o token validado
routes.use(autenticacaoLogin);

routes.get("/usuarios", UsuariosController.DetalharPerfilUsuarios);
routes.get("/usuarios/busca", verificarPermissao, UsuariosController.pesquisarUsuario);
routes.put("/usuarios", validarCorpoRequisicao(campoSenha), UsuariosController.editarSenha);
routes.put("/usuarios/:id", verificarPermissao, validarCorpoRequisicao(camposUsuarios), verificarEmailExistente, UsuariosController.editarPerfilUsuario);
routes.post("/processos/importar", upload.single("arquivo"), importarProcessos);
export default routes;
