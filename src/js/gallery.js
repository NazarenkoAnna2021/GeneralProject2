import {DOM} from "./dom.js";
import {imagePosterLink, URL} from "./constants";

export async function renderCards() {
	const films = await getResponseMovies();
	films.movies.forEach(card => {
		DOM.filmsArea.appendChild(createCards(card));
	})
}

async function getResponseMovies() {
	const res = await fetch(`${URL}/movie`);
	try {
		return await res.json();
	} catch {
		 alert('Что-то фильмы не отображаются');
	}
}

function createCards({ id, poster_path, title, movie_rate }) {
	const templateCardHtml = DOM.templateCard
	.replace("{{id}}", id)
	.replace("{{url}}", imagePosterLink.concat(poster_path))
	.replace("{{text}}", title)
	.replace("{{5}}", movie_rate === null ? '' : movie_rate);
	return htmlToElement(templateCardHtml);
}

function htmlToElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
}