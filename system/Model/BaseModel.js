import env from '../../env.js'
import { DataBase } from './DataBase.js';

export class BaseModel{
    
    #db
    #table
    #fields
    #result
    
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
        // TODO Validation here later
    }

    /**
     * FILTERS
     */
    where(stem, value){
        this.#db.where(stem, value)
        return this
    }

    condition(cond){
        this.#db.condition(cond)
        return this
    }

    order(order){
        this.#db.order(order)
        return this
    }

    /**
      * Modifier and joiners
      */
    join(table, field, key, tableName, join=''){
        let thisTable = this.table
        let condition = `${tableName}.${field} = ${thisTable}.${key}`

        this.#db.join(table, condition, join, tableName)
    }

    /**
      * OPERATIONS
      */
    select(data = null){
        if(data != null){
            this.#db.select(data)
        }
        return this.#db.table(this.#table).run()
    }

    insert(data){
        for (const field in data) {            
            if(! this.#fields.includes(field)){
                throw `Undefined Field: ${field}`
            }
            return this.#db.insert(this.#table, data)
        }
    }

    update(data){
        return this.#db.table(this.#table).update(data).run()
    }

    SQL(query,data){
        return this.#db.SQL(query, data)
    }
}