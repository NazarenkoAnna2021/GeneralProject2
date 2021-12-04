import {DOM} from "./dom.js";
import {imagePosterLink, URL} from "./constants";

async function getResponseMovies() {
	const res = await fetch(`${URL}/movie`);
	try {
		return await res.json();
	} catch {
		await alert('Чтото фильмы не отображаются');
	}
}

async function renderCards() {
	const films = await getResponseMovies();
	films.movies.forEach(card => {
		DOM.filmsArea.appendChild(createCards(card));
	})
}

function createCards({ id, poster_path, title, movie_rate }) {
	const tempCard = document.querySelector("#template-card").content;
	const tempCardId = tempCard.querySelector('.film-card');
	const tempCardPoster = tempCard.querySelector('.film-card__poster');
	const tempCardRate = tempCard.querySelector('.film-card__rate');
	const tempCardTitleText = tempCard.querySelector('.film-card__title-text');
	tempCardId.setAttribute('id', `card${id}`);
	tempCardPoster.setAttribute('src', `${imagePosterLink}${poster_path}`);
	tempCardRate.setAttribute('id', `rate${id}`);
	(tempCardRate.textContent === null) ? tempCardRate.textContent = '' : tempCardRate.textContent = movie_rate;
	tempCardTitleText.setAttribute('id', `title${id}`);
	tempCardTitleText.textContent = title;
	return tempCardId.cloneNode(true);
}

renderCards();
