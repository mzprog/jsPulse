export class Route{
    defaultMethod = "index"

    route ={
        'GET': [],
        'POST': []
    }

    setDefaultMeth(name) {
        defaultMethod = name
    }

    get(from, to){
        this.#create('GET', from, to)
    }

    post(from, to){
        this.#create('POST', from, to)
    }

    #create(verb, from, to){
        this.route[verb].push({
            'from': from,
            'to': to
        })
    }

    async find(verb, from){
        for (let i = 0; i < this.route[verb].length; i++) {
            const item = this.route[verb][i];
            console.log( item.from, from);
            if(item.from == from){
                const Ctl  = await import('../../app/Controller/' + item.to + ".js");
                let ctl = new Ctl.default();
                return ctl['index']();
            }
        }
        return "";
    }
}