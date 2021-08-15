import { view } from "../../system/common.js";

export default class Home{
    index = (data) => {
        let date = new Date()
		return view('index',{date: date})
    }
}