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

router.get('/users/:id/note/:num', (req: any, res: any) => {
    const user = req.params.id;
    const note = req.params.num;
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({message: `You requested user with ID: ${user} and note: ${note}`}));
})

router.post('/users', (req: any, res: any) => {
    // req.body is now available thanks to our router!
    const newUser = req.body;
    console.log('Received new user:', newUser);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User created!', user: newUser }));
});

const server = http.createServer((req: any, res: any) => {
    router.handle(req, res);
    router.output();
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});