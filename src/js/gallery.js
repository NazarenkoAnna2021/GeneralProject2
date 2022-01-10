import { DOM } from "./dom.js";
import { URL } from "./constants";
import axios from "axios";

let current = 1;
let films = {};
let pagesCount = 0;

async function getResponseMoviePage(currentPageNumber) {
		const res = await axios.get(`${URL.URL}/movies?page=${currentPageNumber}`,
			{
				headers: { 'Authorization': localStorage.getItem('token'),
				}
			});
		let resData=res.data.data.data
	console.log(resData)
	return resData;
}

export async function renderStartCards() {
	films = await getResponseMoviePage(current);
	await renderCards(films);
	await renderPagination(films);
}

export async function renderCards(arr) {
	await arr.forEach(card => {
		DOM.filmsArea.appendChild(createCards(card));
	})
}

export async function renderPagination({ totalCount, length }) {
	const totalCountMovies = films.length;
	const lengthMoviesOnCurrentPage = 20;
	pagesCount = Math.ceil(totalCountMovies / lengthMoviesOnCurrentPage);
	DOM.lastPage.textContent = pagesCount + '';
	current = DOM.currentPage.textContent;
	return pagesCount;
}

export function cleanHTML() {
	DOM.filmsArea.innerHTML = '';
}

export async function switchNext() {
	// await cleanHTML();
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

export function htmlToElement(html) {
	const template = document.createElement('template');
	template.innerHTML = html;
	return template.content.firstChild;
}
