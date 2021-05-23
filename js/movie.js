const accordionWrapper = document.querySelector("#accordion-wrapper");

const animeChaptersData = [
	{
		temporada: "Temporada 1",
		chapters: [
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
		],
	},
	{
		temporada: "Temporada 2",
		chapters: [
			{
				number: 1,
				title: "Naruto Shippuden",
			},
			{
				number: 2,
				title: "Naruto Shippuden",
			},
		],
	},
];

const mapChapters = animeChaptersData.map(
	(animeChapter, index) =>
		`<div id="item-list" key="${index}">
<input type="checkbox" id="season-${index}" class="input" />
<label for="season-${index}" class="label">
    ${animeChapter.temporada}
    <div class="icon-collapse">
        <i class="fas fa-chevron-up"></i>
    </div>
    </label>
    <div class="content" id="content-chapters-temporada">
		${animeChapter.chapters.map(
			(chapter, index) =>
				`<section key="${index + 1}">
					<a href="#">
						<div>
							<span>${chapter.number}</span>
							<span>${chapter.title}</span>
						</div>
						<div class="play-icon">
							<i class="fas fa-play-circle"></i>
						</div>
					</a>
			</section>`
		)}
    </div>
</div>`
);

mapChapters.map((chapter) => (accordionWrapper.innerHTML += chapter));
