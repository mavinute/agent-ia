import 'dotenv/config'
import type { FastifyInstance } from "fastify";

import { runDentalAgent } from '../agents/dental.agent';
import { consultaSchema } from '../schemas/consulta.schema';

export async function agenteRoutes(app: FastifyInstance): Promise<void> {
    app.post("/consulta", async(req, replay) => {
        //console.log("BODY RECEBIDO:", JSON.stringify(req.body, null, 2));
        //console.log("PARSED RESULT:", consultaSchema.safeParse(req.body))
        
        const parsed = consultaSchema.safeParse(req.body)

        if(!parsed.success) {
            return replay.status(400).send({
                error: "Dados invalidos"
            })
        }

        try {
             const orientacao = await runDentalAgent(parsed.data)

             return replay.status(200).send({
                sucesso: true,
                orientacao
             })
        
        }catch (error) {
            return replay.status(500).send({
                error: "Erro ao processar a consulta",
                detalhes: error instanceof Error ? error.message : String(error)
            })
        }

    })
}