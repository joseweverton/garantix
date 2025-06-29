import { Router } from "express";
import UsuariosController from "./controllers/usuarios.js";
import { campoSenha, camposUsuarios, emailSenha } from "./middlewares/JOI/schemas.js";
import autenticacaoLogin from "./middlewares/autenticacao.js";
import { validarCorpoRequisicao, verificarEmailExistente, verificarPermissaoCadastroUsuario } from "./middlewares/validacao.js";

const routes = Router();

routes.post("/login", validarCorpoRequisicao(emailSenha), UsuariosController.login);
// a partir daqui tem que ter o token validado
routes.use(autenticacaoLogin);
routes.post("/usuarios", verificarPermissaoCadastroUsuario, validarCorpoRequisicao(camposUsuarios), verificarEmailExistente, UsuariosController.cadastrarUsuario);
routes.get("/usuarios", UsuariosController.DetalharPerfilUsuarios);
routes.put("/usuarios", validarCorpoRequisicao(campoSenha), UsuariosController.editarPerfilUsuario);
export default routes;
