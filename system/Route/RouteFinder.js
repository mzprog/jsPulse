export class RouteFinder{
    
    #from
    #paths
    #result = null

    constructor(from, paths){
        if(from == "/"){
            this.#from = ['/']
        }else{
            this.#from = from.replace(/^\/+|\/+$/g, '').split('/')
        }
        this.#paths = paths
    }

    find(){
        for (let i = 0; i < this.#paths.length; i++) {
            const path = this.#paths[i];

            let match = true // reset the match
            let data = {} // reset the array
            let part = path.path
            let from = this.#from
            if(from.length != part.length){
                continue;
            }

            for (let j = 0; j < from.length; j++) {
                const fpart = from[j];

                if(part[j].type == 'path'){
                    if(part[j].name != fpart){
                        match = false
                        break
                    }
                }else if(part[j].type == 'var'){
                    data[part[j].name] = fpart
                }
            }
            if(match){
                this.#result = {
                    'class': path.route.class,
                    'method':path.route.method,
                    'data': data
                }
                return
            }
        }
    }

    getResult(){
        return this.#result
    }
}