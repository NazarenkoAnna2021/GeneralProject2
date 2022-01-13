import { URL } from "./constants";
//import { htmlToElement } from './gallery';
import axios from "axios";
import { DOM_PAGE } from  "./pageDom";

export async function getCurrentFilmInfo() {
	const id = window.location.search.split('=')[1];
	const info = await getResponseMovie(id);
	console.log(info);
	appendFilmInfoToDOM(info);
	appendReviewToDOM(info);
}

async function getResponseMovie(pageId) {
	const request = await axios.get(`http://localhost:3001/movie`, { 
		headers: { 'Authorization': localStorage.getItem('token') },
		params: { id: pageId}
	});
	return request.data.data;
}

function appendFilmInfoToDOM(data) {
	const template = DOM_PAGE.templateInfo
		.replace("{{titleFilm}}", data.title)
		.replace("{{img}}", URL.imagePosterLink.concat(data.backdrop_path))
		.replace("{{rate}}", data.popularity ? data.popularity : 0)
		.replace("{{filmDate}}", data.release_date)
		.replace("{{country}}", data.original_language.toUpperCase())
		.replace("{{about}}", data.overview)
		.replace("{{tagline}}", data.tagline)
		.replace("{{ganre}}", data.genres)
		.replace("{{status}}", data.status)
		.replace("{{language}}", data.language_in_en)
		.replace("{{budget}}", data.budget)
		.replace("{{revenue}}", data.revenue)
		.replace("{{runtime}}", data.runtime)
		.replace("{{homepage}}", data.homepage)
	const element = document.createElement('template');
	element.innerHTML = template;
	console.log(element);
	DOM_PAGE.mainInfo.append(element.content.firstChild);
}

function appendReviewToDOM(data) {
	data.reviews.forEach(item => {
		const template = DOM_PAGE.templateReview
			.replace("{{login}}", item.login)
			.replace("{{content}}", item.content)
		const element = document.createElement('template');
		element.innerHTML = template;
		console.log(element);
		DOM_PAGE.reviewArea.append(element.content.firstChild);
	})
}

export function closePage(){
	window.close();
}