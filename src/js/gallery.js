import { DOM } from "./dom.js";
import {URL ,constants, pathmames, filtersParams } from "./constants";
import axios from "axios";
import { params } from "./filter"

let currentPage = 0;

async function getResponseMoviePage(setOfParams) {
	const res = await axios.get(`${URL.URL}/movies`, {
		headers: { 'Authorization': localStorage.getItem('token') },
		params: setOfParams
	});
	return res.data.data.data
}

export async function renderCards() {
	params.page = ++currentPage;
	const films = await getResponseMoviePage(params);
	drawCards(films);
	console.log(params, films);
}

export function drawCards(cards) {
	cards.forEach(card => {
		DOM.filmsArea.appendChild(createCards(card));
	})
}

export function cleanHTML() {
	DOM.filmsArea.innerHTML = '';
}

function createCards({ id, poster_path, title, popularity }) {
	const templateCardHtml = DOM.templateCard
		.replace("{{id}}", id)
		.replace("{{url}}", URL.imagePosterLink.concat(poster_path))
		.replace("{{text}}", title)
		.replace("{{5}}", popularity === null ? '' : Math.round(popularity));
	return htmlToElement(templateCardHtml);
}

export function htmlToElement(html) {
	const template = document.createElement('template');
	template.innerHTML = html;
	return template.content.firstChild;
}

export function setCurrentPage(newCurrentPage) { currentPage = newCurrentPage }
