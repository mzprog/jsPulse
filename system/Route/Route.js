import { RouteExpression } from "./RouteExpression.js"
import { RouteFinder } from "./RouteFinder.js"

export class Route{
    defaultMethod = "index"

    route ={
        'GET': [],
        'POST': []
    }

    setDefaultMethod(name) {
        defaultMethod = name
    }

    get(from, to){
        this.#create('GET', from, to)
    }

    post(from, to){
        this.#create('POST', from, to)
    }

    #create(verb, from, to){
        if(from != "/"){
            from = from.trim()
        }
        let exp = new RouteExpression(from, to)
        this.route[verb].push({
            'route': exp.route,
            'path': exp.path
        })
    }

    async getRoute(verb, from){
        if(from != '/'){
            from = from.trim('/')
        }

        let routeFinder = new RouteFinder(from, this.route[verb])
        routeFinder.find()
        
        let result = routeFinder.getResult()
        if(! result){
            return "404 not found";
        }else{
            const Ctl  = await import('../../app/Controller/' + result.class + ".js");
            let ctl = new Ctl.default();
            return ctl[result.method](result.data);
        }
    }
}