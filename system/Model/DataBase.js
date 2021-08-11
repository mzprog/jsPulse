import mysql from 'mysql'

export class DataBase{

    #connetcion

    #query = {
        operation : 'SELECT',
        table : '',
        select : '*',
        where : [],
        whereCondition : 'AND',
        order : '',
        join : [],
    }
    #autoReset = true // always reset the query after executing it

    constructor(data){
        this.#connetcion =  mysql.createConnection(data)
        this.#connetcion.connect(err => {if (err) throw err})
    }

    insert(table, data)
    {
        //formating data
        let keys = []
        let values = []
        let prepare = []
        for (var key in data){
            keys.push(key)
            values.push(data[key])
            prepare.push("?")
        }
        let colomn = "(" + keys.join(", ") + ")"
        let prepared = "(" + prepare.join(", ") + ")"
        
        //sql prepare
        let sql = `INSERT INTO ${table}  ${colomn} VALUES ${prepared}`
        return new Promise( (resolve, reject) => {
            this.#connetcion.query(sql, values, (err, results) => {
                if (err){
                    reject(false)
                    return
                }
                resolve(results.insertId)
            })
        })
    }

    table(name){
        this.#query.table = name
        return this
    }

    select(select){
        if(Array.isArray(select)){
            select = select.join(", ")
        }
        this.#query.select = select
        return this
    }

    where(stem, value){
        this.#query.where.push = [stem, value]
        return this
    }

    condition(value){
        this.#query.whereCondition = value
        return this
    }

    order(order){
        this.#query.order = order
        return this
    }

    join(table, condition, method, tableName){
        this.#query.join.push({
            "table": table,
            "condition": condition,
            "method": method,
            "name": tableName
        })
        return this
    }

    run(){
        let sql = ''
        if(this.#query.table == ''){
            throw "No Table Found to run the query"
        }
        let table = this.#query.table
        //where condition
        let where = ''
        let order = ''
        
        let statement_value = []

        if(this.#query.where.length != 0){
            let where_stem = this.#query.where.map((value, index) => value[0])
            let where_value = this.#query.where.map((value, index) => value[1])
            let new_where = []

            statement_value = statement_value.concat(where_value)
            for(const i in where_stem){
                new_where.push(where_stem[i] + "?")
            }
            let cond = this.#query.whereCondition
            let conditions = new_where.join(` ${cond} `)
            where = `where ( ${conditions} )`
        }

        if(this.#query.order != ''){
            order = "ORDER BY " +  $this.#query.order
        }

        //join tables
        let join = '';
        for (const i in this.#query.join ) {
            const row = this.#query.join[i]

            let name = (row.name == '')? "":`as ${row.name}`
            let tmp = ` ${row.method} JOIN ${row.table} ${name} ON ${row.condition} `;
            join += tmp;
        }

        switch (this.#query.operation) {
            case 'SELECT':
                let select = $this.#query.select
                sql = `SELECT ${select} FROM ${table} ${join} ${where} ${order}`
                break;
            
            case 'UPDATE':
                const set = $this.#query.data;
                statement_value = $this.#query.values.concat(statement_value)
                sql = `UPDATE ${table} ${set} ${where}`
                break;
        
            case 'DELETE':
                sql = `DELETE FROM ${table} ${where}`
                break;
        }

        this.#resetQuery()

        //sql prepare
        return new Promise( (resolve, reject) => {
            this.#connetcion.query(sql, statement_value, (err, results) => {
                if (err){
                    reject(false)
                    return
                }
                resolve(results)
            })
        })
    }

    update(data){
        this.#query.operation = 'UPDATE'

        let keys = []
        let values = []
        for (var key in data){
            keys.push(key)
            values.push(data[key])
        }

        let tmp = {}
        for (const key of keys) {    
            tmp.push(`${key} = ?`)
        }
        let joined = tmp.join(', ')
        this.#query.data = `SET ${joined}`
        
        this.#query.values = values
        this.#query.main_data = data
        
        return this
    }

    SQL(sql, values = {}){
        return new Promise( (resolve, reject) => {
            this.#connetcion.query(sql, values, (err, results) => {
                if (err){
                    reject(false)
                    return
                }
                resolve(results)
            })
        })
    }

    #resetQuery(){
        if(this.#autoReset){
            this.#query = {
                operation : 'SELECT',
                table : '',
                select : '*',
                where : [],
                whereCondition : 'AND',
                order : '',
                join : [],
            }
        }
    }

    setAutoReset(value){
        this.#autoReset = value
        return this
    }


}