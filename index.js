import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Carrega variáveis do .env

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Usa a chave do .env
});

app.post("/gerar-alternativas", async (req, res) => {
  const { pergunta, respostaCorreta } = req.body;

  if (!pergunta || !respostaCorreta) {
    return res.status(400).json({ error: "Informe pergunta e respostaCorreta." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Você é um gerador de alternativas incorretas para quizzes. Receberá uma pergunta e a resposta correta, e deve gerar 3 alternativas erradas que pareçam plausíveis, mas que estejam incorretas. Me mande completo, enunciado, questão correta e incorretas.",
        },
        {
          role: "user",
          content: `Pergunta: ${pergunta}\nResposta correta: ${respostaCorreta}\nGere 3 alternativas erradas.`,
        },
      ],
    });

    const resposta = completion.choices[0].message.content;
    res.json({ alternativasErradas: resposta.split("\n").filter(Boolean) });
  } catch (error) {
    console.error("Erro ao gerar alternativas:", error);
    res.status(500).json({ error: "Erro ao gerar alternativas" });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
