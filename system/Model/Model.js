import { BaseModel } from "./BaseModel.js";

export class Model extends BaseModel{

    #primaryKey = 'id'
    #table
    #fields
    
    constructor(data) {
        super(data);
    }

    async hasMany(modelClass, field, tableName = '', join = ''){
        const Model  = await import('../../app/Model/' + modelClass + ".js")
        let ctl = new Model.default();

        let joinData = ctl['getJoinAuth'](field)
        if(! joinData){
            throw "Unable to join table. Check your data"
        }
        if(tableName == ''){
            tableName = joinData.name
        }
        this.join(joinData.name, joinData.field, this.#primaryKey, tableName, join)
        return this
    }

    async belongTo(modelClass, field, tableName = '', join = ''){
        const Model  = await import('../../app/Model/' + modelClass + ".js")
        let ctl = new Model.default();

        let joinData = ctl['getJoinAuth']()
        if(! joinData){
            throw "Unable to join table. Check your data"
        }
        if(tableName == ''){
            tableName = joinData.name
        }
        this.join(joinData.name, joinData.field, field, tableName, join)
        return this
    }

	/**
	 * getJoinAuth
	 * Used to get the details of a table we want to join
	 * Will return false if fail
	 */
    getJoinAuth = (field = '') => {
        if(field == ''){
            field = this.#primaryKey
        }else if(! this.#fields.include(field)){
            return false
        }

        return {
            'name': this.#table,
            'field': field
        }
    }

    table = () => { return this.#table}
}