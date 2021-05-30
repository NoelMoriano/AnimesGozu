const containerEpisodes = document.querySelector("#container-episodes-anime");

console.log(containerEpisodes);

const fetchEpisodes = async () => {
	const response = await fetch("./js/data.json");

	const responseJson = await response.json();

	const resultData = await responseJson;

	console.log("resultData->", resultData);

	resultData.episodes.map(
		(episode, index) =>
			(containerEpisodes.innerHTML += `<section key="${index + 1}">
    <a href="${episode.video_url}" target="_blank">
        <div>
            <span>${episode.episode_id}</span>
            <span>${episode.title}</span>
        </div>
        <div class="play-icon">
      <i class="fas fa-play-circle"></i>
        </div>
    </a>
</section>`)
	);
};

fetchEpisodes();
