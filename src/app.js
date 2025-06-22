import express from "express";
import routes from "./rotas.js";

class App {
	constructor() {
		this.app = express();
		this.middlewares(); //middleware global
		this.routes();
	}

	middlewares() {
		this.app.use(express.json());
	}

	routes() {
		this.app.use(routes);
	}
}
export default new App().app;
