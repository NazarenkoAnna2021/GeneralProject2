import { DOM } from "./dom.js"
const aa = 'https://image.tmdb.org/t/p/original';
const url = 'https://wowmeup.pp.ua';
let state = {};

async function getResponseMovies() {
	const res = await fetch(`${url}/movie`);
	state = await res.json();
}
export async function main() {
	await getResponseMovies();
	// console.log(state);
	// console.log(state.movies[0]);
	createCards();
	console.log(state);
}
//backdrop_path movie_rate title
function createCards() {
	state.movies.forEach((element, index) => {
		const html = DOM.templateCard
			.replace("{{id}}", index)
			.replace("{{url}}", aa.concat(element.backdrop_path))
			.replace("{{text}}", element.title)
			.replace("{{5}}", element.movie_rate === null ? '' : element.movie_rate);
		DOM.filmsArea.appendChild(htmlToElement(html));
	});
}
function htmlToElement(html) {
	const template = document.createElement('template');
	html = html.trim();
	template.innerHTML = html;
	return template.content.firstChild;
}
