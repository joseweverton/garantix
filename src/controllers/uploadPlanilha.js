import path from "node:path";
import knex from "../model/conexao.js";
import { processarPlanilha } from "../utils/processarPlanilha.js";

export async function importarProcessos(req, res) {
	try {
		if (!req.file) {
			return res.status(400).json({ mensagem: "Arquivo não enviado." });
		}

		const caminhoArquivo = path.resolve(req.file.path);
		const registros = processarPlanilha(caminhoArquivo, req.file.originalname);

		if (registros.length === 0) {
			return res.status(400).json({ mensagem: "Nenhum dado encontrado na planilha." });
		}

		await knex("processos").insert(registros);

		return res.status(200).json({ mensagem: "Importação realizada com sucesso." });
	} catch (erro) {
		console.error("Erro ao importar:", erro);
		return res.status(500).json({ mensagem: "Erro interno ao processar planilha." });
	}
}
