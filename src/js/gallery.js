import {DOM} from "./dom.js";
import {imagePosterLink, URL} from "./constants";

async function getResponseMovies() {
	const res = await fetch(`${URL}/movie`);
	try {
		return await res.json();
	} catch {
		 alert('Что-то фильмы не отображаются');
	}
}

export async function renderCards() {
	const films = await getResponseMovies();
	films.movies.forEach(card => {
		DOM.filmsArea.appendChild(createCards(card));
	})
}

function createCards({ id, poster_path, title, movie_rate }) {
	const tempCardId = DOM.templateCard.querySelector('.film-card');
	const tempCardPoster = DOM.templateCard.querySelector('.film-card__poster');
	const tempCardRate = DOM.templateCard.querySelector('.film-card__rate');
	const tempCardTitleText = DOM.templateCard.querySelector('.film-card__title-text');
	tempCardId.setAttribute('id', `card${id}`);
	tempCardPoster.setAttribute('src', `${imagePosterLink}${poster_path}`);
	tempCardRate.setAttribute('id', `rate${id}`);
	(tempCardRate.textContent === null) ? tempCardRate.textContent = '' : tempCardRate.textContent = movie_rate;
	tempCardTitleText.setAttribute('id', `title${id}`);
	tempCardTitleText.textContent = title;
	return tempCardId.cloneNode(true);
}


