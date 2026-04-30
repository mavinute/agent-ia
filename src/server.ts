import Fastify from 'fastify';
import { agenteRoutes } from './routes/agente';

const app = Fastify({
    logger: true,
});

app.register(agenteRoutes)

app.get('/', async (req, res) => {
    return res.send('Hello Word!')
})

app.listen({port: Number(process.env.PORT) || 3000
}, (err, address) => {
    if(err){
        app.log.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
})