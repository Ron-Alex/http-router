type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type RouteHandler = (req: any, res: any) => void;

interface RouteMap {
    [path: string]: RouteHandler;
}

interface Routes{
    [method: string]: RouteMap;
}

class Router{
    private routes: Routes;
    constructor(){
        this.routes = {};
    }

    addRoute(method: HTTPMethod, path: string, handler: RouteHandler): void{
        if(!this.routes[method]) {
            this.routes[method] = {};
        }
        this.routes[method][path] = handler;
    }

    get(path: string, handler: RouteHandler): void{
        this.addRoute('GET', path, handler);
    }

    post(path: string, handler: RouteHandler): void{
        this.addRoute('POST', path, handler);
    }

    output(){
        console.log(this.routes);
    }

    handle(req: any, res: any){
        const {method, url} = req;
        const path = url.split('?')[0];

        const methodRoutes = this.routes[method];
        if(methodRoutes) {
            const handler = methodRoutes[path];
            if(handler) {
                return handler(req, res);
            }
        }
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error: "NOT FOUND"}));
    }
}

module.exports = Router;