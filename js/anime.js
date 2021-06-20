const episodesWrapper = document.querySelector("#episodes-wrapper");

const episodesData = [
	{
		number: 1,
		title: "Naruto Shippuden",
	},
	{
		number: 2,
		title: "Naruto Shippuden",
	},
	{
		number: 3,
		title: "Naruto Shippuden",
	},
	{
		number: 4,
		title: "Naruto Shippuden",
	},
];

episodesData.map(
	(episode, index) =>
		(episodesWrapper.innerHTML += `<section key="${index + 1}">
		<a href="#">
			<div>
				<span>${episode.number}</span>
				<span>${episode.title}</span>
			</div>
			<div class="play-icon">
				<i class="fas fa-play-circle"></i>
			</div>
		</a>
	</section>`)
);
