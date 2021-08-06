export default class Home{
    index = (data) => {
        return `
        	<div>
          		<span><b>Some</b> HTML here</span>
			</div>
			<a href="/from">from</a>
		`;
    }

	user = data => {
		return "user = " + data.id
	}
}