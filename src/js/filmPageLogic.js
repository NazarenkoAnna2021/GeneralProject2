import { URL } from "./constants";
import { htmlToElement } from './gallery';
import { DOM } from "./dom";

export async function getCurrentFilmInfo() {
	const id = window.location.search.split('=')[1];
	const info = await getResponseMovie(id);
	appendFilmInfoToDOM(info);
}

async function getResponseMovie(id) {
	const request = await fetch(`${URL.URL}/movie?id=${id}`, {headers: { Authorization: localStorage.getItem('token') }});
	const response = request.json();
	return response.data;
}

function correctReleaseDate(date) {
	return date.split('T')[0].split('-').reverse().join('-');
}

function appendFilmInfoToDOM(data) {
	const template = DOM.templateFilmHtml
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
