const http = require('http');

const nRouter = require('./router');

const PORT = 3000;
const router = new nRouter;

router.get('/', (req: any, res: any) => {
    res.end("YOO");
})

router.get('/users', (req: any, res: any) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({message: "GOONIERE!"}));
})

const server = http.createServer((req: any, res: any) => {
    router.handle(req, res);
    router.output();
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});