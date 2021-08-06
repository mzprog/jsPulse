export default class Home{
    index = (data) => {
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
}