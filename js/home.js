//Set data
const cateryAccion = document.querySelector("#category-accion");
const cateryRomance = document.querySelector("#category-romance");
const cateryAventura = document.querySelector("#category-aventura");

const imagesAccion = [
	"accion/image 3.png",
	"accion/image4.png",
	"accion/image 5.png",
	"accion/image 6.png",
	"accion/image 7.png",
];

const imagesRomance = [
	"romance/image 8.png",
	"romance/image 9.png",
	"romance/image 10.png",
	"romance/image 11.png",
	"romance/image 12.png",
];

const imagesAventura = [
	"aventura/image 13.png",
	"aventura/image 14.png",
	"aventura/image 15.png",
	"aventura/image 16.png",
	"aventura/image 17.png",
];

const setImageCategories = (imagesData, categoryType) => {
	imagesData.map(
		(imageAccion, index) =>
			(categoryType.innerHTML += `<a href="movie.html" key="${index}">
				<div class="item-anime">
					<img src="images/home/animes/${imageAccion}" alt="image" />
					<div class="hover-effect">
						<h3>Titulo del anime</h3>
						<p>Lorem ipsum, Magnam asperiores, quam doloremque deleniti amet facere dolore tempore natus dignissimos voluptates illo animi doloribus! Quis sint eveniet, quibusdam in amet error, quibusdam in amet error bla bla bla bla</p>	
					</div>
				</div>	
			</a>`)
	);
};

setImageCategories(imagesAccion, cateryAccion);
setImageCategories(imagesRomance, cateryRomance);
setImageCategories(imagesAventura, cateryAventura);
