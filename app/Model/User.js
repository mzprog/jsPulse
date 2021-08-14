import { Model } from "../../system/Model/Model";

export class User extends Model{

    constructor(){
        super({
            table: "users",
			fields: ["name", "email", "password", "type"]
        })
    }
}