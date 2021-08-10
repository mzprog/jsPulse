import env from '../../env.js'
import { DataBase } from './DataBase.js';

export class BaseModel{
    
    #db
    
    constructor(){
        this.#db = new DataBase({
            host: env.M_DB_HOST,
            user: env.M_DB_USER,
            password: env.M_DB_PASS,
            database: env.M_DB_NAME
        })
    }
}