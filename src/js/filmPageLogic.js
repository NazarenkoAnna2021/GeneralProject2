import { URL } from "./constants";
import { htmlToElement } from './gallery';
import { DOM } from "./dom";

export async function getCurrentFilmInfo() {
	console.log(DOM.mainContainer.innerHTM);
	const id = window.location.search.split('=')[1];
	const info = await getResponseMovie(id);
	appendFilmInfoToDOM(info);
}

async function getResponseMovie(id) {
	const request = await fetch(`${URL.URL}/movie?id=${id}`, {headers: { Authorization: localStorage.getItem('token') }});
	const response = request.json();
	return response.data.data.data;
}

function appendFilmInfoToDOM(data) {
	const template = DOM.mainContainer.innerHTML
	console.log(template)
		.replace("{{titleFilm}}", data.title)
		.replace("{{img}}", URL.imagePosterLink.concat(data.backdrop_path))
		.replace("{{rate}}", data.movie_rate === null ? '0' : data.movie_rate)
		.replace("{{filmDate}}", data.release_date)
		.replace("{{country}}", data.original_language.toUpperCase())
		.replace("{{about}}", data.overview)
		.replace("{{tagline}}", data.tagline)
		.replace("{{ganre}}", data.genre_ids)
	const filmElem = htmlToElement(template);
	DOM.mainContainer.append(filmElem);
}
