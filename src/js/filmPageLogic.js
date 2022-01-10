import {URL} from "./constants";
import {htmlToElement} from './gallery';

export async function getCurrentFilmInfo() {
	const id = window.location.search.split('=')[1];
	const info = await getResponseMovie(id);
	appendFilmInfoToDOM(info);
}

async function getResponseMovie(id) {
	const request = await fetch(`${URL.URL}/movie/${id}`);
	const response = await request.json();
	return response.movie;
}

function correctReleaseDate(date) {
	return date.split('T')[0].split('-').reverse().join('-');
}

function appendFilmInfoToDOM(data) {
	const templateFilmHtml = document.querySelector('#main-container').innerHTML
		.replace("{{titleFilm}}", data.title)
		.replace("{{img}}", URL.imagePosterLink.concat(data.backdrop_path))
		.replace("{{rate}}", data.movie_rate === null ? '0' : data.movie_rate)
		.replace("{{filmDate}}", correctReleaseDate(data.release_date))
		.replace("{{country}}", correctReleaseDate(data.original_language.toUpperCase()))
		.replace("{{about}}", data.overview)
		.replace("{{tagline}}", data.tagline)
		.replace("{{ganre}}", bbb(data.genre_ids))

	const filmElem = htmlToElement(templateFilmHtml);
	const mainContainer = document.querySelector('.main-info');
	mainContainer.appendChild(filmElem);
}
