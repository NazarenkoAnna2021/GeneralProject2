import { DOM } from "./dom.js";
import { URL } from "./constants";

let current = 1;
let films = {};
let pagesCount = 0;

async function getResponseMoviePage(currentPageNumber) {
	try {
		const res = await fetch(`${URL.URL}/movie?page=${currentPageNumber}`);
		return res.json();
	} catch {
		alert('dont movie');
	}
}

export async function renderStartCards() {
	films = await getResponseMoviePage(current);
	await renderCards(films);
	await renderPagination(films);
}

async function renderCards(arr) {
	await arr.movies.forEach(card => {
		DOM.filmsArea.appendChild(createCards(card));
	})
}

async function renderPagination({ totalCount, movies }) {
	const totalCountMovies = totalCount;
	const lengthMoviesOnCurrentPage = movies.length;
	pagesCount = Math.ceil(totalCountMovies / lengthMoviesOnCurrentPage);
	DOM.lastPage.textContent = pagesCount + '';
	current = DOM.currentPage.textContent;
	return pagesCount;
}

function cleanHTML() {
	DOM.filmsArea.innerHTML = '';
}

export async function switchPrev() {
	await cleanHTML();
	DOM.currentPage.textContent = --current + '';
	check(current, pagesCount);
	films = await getResponseMoviePage(current);
	await renderCards(films);
}

export async function switchNext() {
	await cleanHTML();
	DOM.currentPage.textContent = ++current + '';
	check(current, pagesCount);
	films = await getResponseMoviePage(current);
	await renderCards(films);
}

function check(current, lastPage) {
	if (current === lastPage) {
		DOM.paginationBtnNext.classList.add("disabled");
	} else {
		DOM.paginationBtnNext.classList.remove("disabled");
	}

	if (current === 1) {
		DOM.paginationBtnPrev.classList.add("disabled");
	} else {
		DOM.paginationBtnPrev.classList.remove("disabled");
	}
}

function createCards({ id, poster_path, title, movie_rate }) {
	const templateCardHtml = DOM.templateCard
		.replace("{{id}}", id)
		.replace("{{url}}", URL.imagePosterLink.concat(poster_path))
		.replace("{{text}}", title)
		.replace("{{5}}", movie_rate === null ? '' : movie_rate);
	return htmlToElement(templateCardHtml);
}

function htmlToElement(html) {
	const template = document.createElement('template');
	template.innerHTML = html;
	return template.content.firstChild;
}