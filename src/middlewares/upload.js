import path from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";

const nomeArquivo = fileURLToPath(import.meta.url);
const pastaAtual = path.dirname(nomeArquivo);

const configArmazenamento = multer.diskStorage({
	destination: path.resolve(pastaAtual, "..", "uploads"),
	filename: (req, arquivo, callback) => {
		const timestamp = Date.now();
		const extensao = path.extname(arquivo.originalname);
		const nomeBase = path.basename(arquivo.originalname, extensao);
		callback(null, `${nomeBase}-${timestamp}${extensao}`);
	},
});

export default multer({ storage: configArmazenamento });
