import mysql from 'mysql'

export class DataBase{

    #connetcion
    
    constructor(data){
        this.#connetcion =  mysql.createConnection(data)
        this.#connetcion.connect(err => {if (err) throw err})
    }
}