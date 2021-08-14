import { Model } from "../../system/Model/Model";

export class User extends Model{

    /**
     * This is how to use Model first use the constructor 
     * and call the parent constructor and give it the 
     * table name in the database..
     * and the array or fields names without the id
     */
    constructor(){
        super({
            table: "users",
			fields: ["name", "email", "password", "type"]
        })
    }
}