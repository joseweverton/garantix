import xlsx from "xlsx";

export function processarPlanilha(caminhoArquivo, nomeArquivo) {
	const workbook = xlsx.readFile(caminhoArquivo, { cellDates: true });
	const sheet = workbook.Sheets[workbook.SheetNames[0]];
	const linhas = xlsx.utils.sheet_to_json(sheet, { header: 1 });

	const registros = [];

	for (let i = 1; i < linhas.length; i++) {
		const linha = linhas[i];

		const registro = {
			id_processo: linha[0],
			data_abertura: converterParaTimestamp(linha[1]),
			aberto_por: linha[2],
			nome_arquivo: nomeArquivo,
			data_importacao: new Date(),
		};

		registros.push(registro);
	}

	return registros;
}

function converterParaTimestamp(valor) {
	if (!valor) return null;

	if (valor instanceof Date) {
		return valor.toISOString();
	}

	if (typeof valor === "string" && valor.includes("/")) {
		const [data, hora = "00:00:00"] = valor.split(" ");
		const [dia, mes, ano] = data.split("/");
		return `${ano}-${mes}-${dia} ${hora}`;
	}

	if (!Number.isNaN(Number(valor))) {
		const excelEpoch = new Date(Date.UTC(1899, 11, 30));
		const dataConvertida = new Date(excelEpoch.getTime() + valor * 86400000);
		return dataConvertida.toISOString();
	}

	return null;
}
