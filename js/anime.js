const episodesWrapper = document.querySelector("#episodes-wrapper");

const fetchPost = async (url) => {
	const response = await fetch(url);
	const users = await response.json();

	console.log(users);

	filterUsers(users).map(
		(user) =>
			(episodesWrapper.innerHTML += `<section key=${user.id}>
	<a href="#">
		<div>
		<span>${user.id}</span>
			<span>${user.username}</span>
			<span>${user.email}</span>
		</div>
		<div class="play-icon">
			<i class="fas fa-play-circle"></i>
		</div>
	</a>
</section>`)
	);
};

const filterUsers = (users) => users.filter((user) => user.email !== "Sincere@april.biz");

fetchPost("https://jsonplaceholder.typicode.com/users");
