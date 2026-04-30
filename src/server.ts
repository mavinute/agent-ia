import Fastify from 'fastify';

const app = Fastify({
    logger: true,
});

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