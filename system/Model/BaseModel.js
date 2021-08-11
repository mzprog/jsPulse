import env from '../../env.js'
import { DataBase } from './DataBase.js';

export class BaseModel{
    
    #db
    #table
    #fields
    
    constructor(data){
        if (data.table === undefined){
            throw "Error: Define the table first";
        }
        if (data.fields === undefined){
            throw "Error: Define the fields first";
        }
        this.#table = data.table
        this.#fields = data.fields

        this.#db = new DataBase({
            host: env.M_DB_HOST,
            user: env.M_DB_USER,
            password: env.M_DB_PASS,
            database: env.M_DB_NAME
        })
        //testing
        this.#db.insert(this.#table, {name:"aaaa"}).then(ok => console.log(ok))
    }
}