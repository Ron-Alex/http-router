const http = require('http');

const PORT = 3000;

const server = http.createServer((req: any, res: any) => {
    const {method, url} = req;
    
    res.setHeader('Content-Type', 'application/json');

    if(method === 'GET' && url === "/") {
        res.writeHead(200);
        res.end("E - OO - E - A - E - OO - O - A - E - E - OO - E - A - E");
    }
    else{
        res.writeHead(404);
        res.end("COULD NOT FIND RESOURCE");
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});