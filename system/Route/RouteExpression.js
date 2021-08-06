export class RouteExpression{

    route
    path

    constructor(from, to){
        this.from = from
        this.to = to

        this.#sourceExpression()
        this.#destinationExpression()
    }

    #sourceExpression(){
        if(this.from == '/'){
            this.path =[
                {
                    'type': 'path',
                    'name': '/'
                }
            ]
            return
        }

        let sections = this.from.replace(/^\/+|\/+$/g, '').split("/")
        for (let i = 0; i < sections.length; i++) {
            const sect = sections[i];
            // is var?
            let isVar = this.#checkVariable(sect)
            if(isVar.type == false){
                isVar = this.#checkPath(sect)
                if(isVar.type == false){
                    throw "Bad Route Path format: `" + sect + "`"
                }
            }
            sections[i] = isVar
        }
        this.path = sections
    }

    #destinationExpression(){
        let reg = /^(?<class>([\\\]*[a-zA-Z_\d]+)+)(::(?<method>[a-zA-Z_\d]+))?$/
        let match = reg.exec(this.to)

        if(match == null){
            throw 'Bad route class and method'
        }

        this.route = {
            'class': match.groups.class,
            'method': match.groups.method ?? 'index'
        }
    }

    #checkVariable(name){
        let reg = /^{(?<name>[a-zA-Z_\d]+)}$/;
        let match = reg.exec(name)
        //name.match(reg)
        if(match != null){
            return {
                'type': 'var',
                'name': match.groups.name
            }
        }else{
            return {
                'type': false,
            }
        }
    }

    #checkPath(name){
        let reg = /^(?<name>[a-zA-Z_\d\?]+)$/;
        let match = reg.exec(name)

        if(match != null){
            return {
                'type': 'path',
                'name': match.groups.name
            }
        }else{
            return {
                'type': false,
            }
        }
    }
}