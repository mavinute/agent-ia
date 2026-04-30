import type { FastifyInstance } from "fastify";

export async function agenteRoutes(app: FastifyInstance){
    app.post("/agente", (req, replay) => {
        //console.log("REQ", req)
        return replay.send("rota de post")
    })
}