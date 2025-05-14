import { listarQuestoes, obterQuestaoPorID, criarQuestao, atualizarQuestao, excluirQuestao } from '../models/Questao.js';
import { fileURLToPath} from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const listarQuestoesController = async (req, res) => {
	try {
		const questoes = await listarQuestoes();
		res.status(200).json(questoes)
	} catch (err) {
		console.error('Erro ao listar Questoes ', err)
		res.status(500).json({ mensagem: 'Erro ao listar Questoes'})
	}
}

const obterQuestaoPorIDController = async (req, res) => {
	try {
		const Questao = await obterQuestaoPorID(req.params.id);
		if (Questao) {
			res.status(200).json(Questao)
		} else {
			res.status(404).json({ mensage: 'Questao não encontrada'})
		}
	} catch (err){
		console.error('Erro ao obter Questao por ID: ', err)
		res.status(500).json({ mensagem: 'Erro ao listar Questao'})
	}
}

const criarQuestaoController = async (req, res) => {
	try {
		const { enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta, id_disciplina, id_professor } = req.body;

		let imgPath = null;

		if (req.file) {
			imgPath = req.file.path.replace(__dirname.replace('\\controllers', ''), '');
		}

		const QuestaoData = {
			enunciado: enunciado,
			alternativa_a: alternativa_a,
			alternativa_b: alternativa_b,
			alternativa_c: alternativa_c,
			alternativa_d: alternativa_d,
			correta: correta,
			imagem_questao: imgPath,
			id_disciplina: id_disciplina,
			id_professor: id_professor
		}

		const QuestaoId = await criarQuestao(QuestaoData);
		res.status(201).json({ mensagem: 'Questao criado com sucesso', QuestaoId });

	} catch (error) {
		console.error('Erro ao criar Questao: ', error)
		res.status(500).json({ mensagem: 'Erro ao criar Questao'})
	}
}

const atualizarQuestaoController = async (req, res) => {
	try {
		const QuestaoId = req.params.id;
		const {  enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta, id_disciplina, id_professor } = req.body;

		let imgPath = null;

		if (req.file) {
			capaPath = req.file.path.replace(__dirname.replace('\\controllers', ''), '');
		}

		const QuestaoData = {
			enunciado: enunciado,
			alternativa_a: alternativa_a,
			alternativa_b: alternativa_b,
			alternativa_c: alternativa_c,
			alternativa_d: alternativa_d,
			correta: correta,
			imagem_questao: imgPath,
			id_disciplina: id_disciplina,
			id_professor: id_professor
		}
		
		await atualizarQuestao(QuestaoId, QuestaoData);
		res.status(201).json({ mensagem: 'Questao atualizado com sucesso' });

	} catch (error) {
		console.error('Erro ao atualizar Questao: ', error)
		res.status(500).json({ mensagem: 'Erro ao atualizar Questao'})
	}
}

const excluirQuestaoController = async (req, res) => {
	try {
		const QuestaoId = req.params.id;
		await excluirQuestao(QuestaoId)
	} catch (error) {
		console.error('Erro ao excluir Questao: ', error)
		res.status(500).json({ mensagem: 'Erro ao excluir Questao'})
	}
}

export { listarQuestoesController, obterQuestaoPorIDController, criarQuestaoController, atualizarQuestaoController, excluirQuestaoController}