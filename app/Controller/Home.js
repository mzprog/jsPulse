import { view } from "../../system/common.js";
import { Model } from "../../system/Model/Model.js";

export default class Home{
    index = (data) => {
		// testing here
		let db = new Model({
			table: "test",
			fields: ["name"]
		});
		db.insert({name:"123"})
		return `
			<link rel="stylesheet" href="/css/style.css">
        	<div>
          		<span><b>Some</b> HTML here</span>
			</div>
			<a href="/from">from</a>
			<img src="/img/heart.png">
		`;
    }

	user = data => {
		return "user = " + data.id
	}

	ejs = data => {
		return view('index',{title:" MZ Title"})
	}
}