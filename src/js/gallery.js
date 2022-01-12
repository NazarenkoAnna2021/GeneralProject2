import { DOM } from "./dom.js";
import { URL } from "./constants";
import axios from "axios";

//let current = 1;
let films = {};
let currentPage = 0;

async function getResponseMoviePage(setOfParams) {
	const res = await axios.get(`${URL.URL}/movies`, { 
		headers: { 'Authorization': localStorage.getItem('token') },
		params: {page: ++currentPage}
	});
	let resData = res.data.data.data
	console.log(resData)
	return resData;
}

export async function renderCards() {
	films = await getResponseMoviePage(++currentPage);
	drawCards(films);
}

export function drawCards(cards) {
	cards.forEach(card => {
		DOM.filmsArea.appendChild(createCards(card));
	})
}

export function cleanHTML() {
	DOM.filmsArea.innerHTML = '';
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
