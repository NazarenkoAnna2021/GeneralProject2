import { DOM } from "./dom.js";
import {URL ,constants, pathmames, filtersParams } from "./constants";
import axios from "axios";
import {isFiltersOn, setGalleryByFilters} from "./filter";

let films = {};
export let currentPage = 1;

export async function getResponseMoviePage(setOfParams) {
	try {
		const res = await axios.get(URL.URL.concat(pathmames.movies), {
			headers: {'Authorization': localStorage.getItem('token')},
			params: setOfParams
		});
		console.log(setOfParams)
		let resData = res.data.data.data
		console.log(res)
		return resData;
	}
	catch (error) {
		if (error.response.status === 418){
			DOM.filmsArea.append('There seems to be nothing here...')
	// 		DOM.paginationBtnNext.setAttribute('disabled', true)   Почему-то не блокирует
		}
	}
}

export async function renderNextPage() {
		currentPage++
		if (isFiltersOn) {
			setGalleryByFilters(currentPage)
			console.log('filters')
		} else {
			renderCards({page: currentPage})
			console.log('page')
		}
	}

export async function renderCards(params) {
	films = await getResponseMoviePage(params);
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