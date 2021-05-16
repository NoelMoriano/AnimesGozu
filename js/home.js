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
			(categoryType.innerHTML += `<a href="movie.html" key="${index}"><img src="images/home/animes/${imageAccion}" alt="image" /></a>`)
	);
};

setImageCategories(imagesAccion, cateryAccion);
setImageCategories(imagesRomance, cateryRomance);
setImageCategories(imagesAventura, cateryAventura);
