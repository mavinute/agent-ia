import OpenAI from 'openai';
import { dentalSystemPrompt } from '../prompts/dental.prompts';
import type { ConsultaInput } from '../schemas/consulta.schema';

export async function runDentalAgent(dadosConsulta: ConsultaInput): Promise<string> {

  // ← instancia dentro da função para garantir que o .env já foi carregado
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const { paciente, queixa_principal, possivel_diagnostico, regiao_afetada, ja_fez_tratamento, observacoes } = dadosConsulta;

  const userMessage = `
Dados clínicos do paciente:

- Nome: ${paciente.nome ?? 'Não informado'}
- Idade: ${paciente.idade} anos
- Peso: ${paciente.peso ? paciente.peso + ' kg' : 'Não informado'}
- Gestante: ${paciente.gestante ? 'Sim' : 'Não'}
- Alergias: ${paciente.alergias.length > 0 ? paciente.alergias.join(', ') : 'Nenhuma relatada'}
- Comorbidades: ${paciente.comorbidades.length > 0 ? paciente.comorbidades.join(', ') : 'Nenhuma'}
- Queixa principal: ${queixa_principal}
- Possível diagnóstico: ${possivel_diagnostico}
- Região afetada: ${regiao_afetada ?? 'Não informada'}
- Já fez tratamento: ${ja_fez_tratamento ? 'Sim' : 'Não'}
- Observações: ${observacoes ?? 'Nenhuma observação adicional'}

Com base nesses dados, forneça o protocolo de procedimento e a prescrição medicamentosa.
  `

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: dentalSystemPrompt },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.2,
  })

  const content = completion.choices[0].message.content

  if (!content) {
    throw new Error('Resposta vazia da OpenAI')
  }

  return content
}