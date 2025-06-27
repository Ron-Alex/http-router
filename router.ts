type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type RouteHandler = (req: any, res: any) => void;

interface RouteMap {
    pattern: RegExp,
    params: Array<string>,
    handler: RouteHandler
}

interface Routes{
    [method: string]: RouteMap[];
}

class Router{
    private routes: Routes;
    constructor(){
        this.routes = {};
    }

    addRoute(method: HTTPMethod, path: string, handler: RouteHandler): void{
        if(!this.routes[method]) {
            this.routes[method] = [];
        }
        
        const params: any = [];
        const pathRegex = path.replace(/:(\w+)/g, (_, paramName) => {
            params.push(paramName);
            return '([^/]+)';
        });

        const pattern = new RegExp(`^${pathRegex}$`);

        

        this.routes[method].push({pattern, params, handler});
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
        console.log(methodRoutes);
        if(methodRoutes) {
            for(const route of methodRoutes){
                const match = path.match(route.pattern);

                if(match){
                    const params: {[key: string]: string} = {  };
                    req.params = params;
                    route.params.forEach((paramName: string, index: number) =>{
                        params[paramName] = match[index + 1];
                    })

                    if(method === 'POST' || method === 'PUT'){
                        let body = '';
                        req.on('data', (chunk: any) => {
                            body += chunk.toString();
                        })
                        req.on('end', () => {
                            req.body = body ? JSON.parse(body): {};
                            return route.handler(req, res);
                        })
                    }
                    else{
                        return route.handler(req, res);
                    }
                    return;
                }
            }
        }
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error: "NOT FOUND"}));
    }
}

module.exports = Router;