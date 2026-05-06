import Fastify from 'fastify';
import cors from '@fastify/cors';

import { agenteRoutes } from './routes/agent.route';

const app = Fastify({
    logger: true,
});

app.register(cors, {
  origin: '*', // ajuste para o domínio do frontend em produção
})

app.get('/', async (req, res) => {
    return res.send('Hello Word!')
})

app.register(agenteRoutes)

try {
    app.listen({ port: Number(process.env.PORT) || 3000, host: '0.0.0.0' })
    console.log('🦷 Dental Agent rodando na porta 3000')
} catch (err) {
    app.log.error(err);
    process.exit(1);
}