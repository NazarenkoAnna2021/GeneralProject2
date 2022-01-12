import { URL } from "./constants";
//import { htmlToElement } from './gallery';
import axios from "axios";
//const { DOM } =  require("./dom");

export async function getCurrentFilmInfo() {
	const id = window.location.search.split('=')[1];
	const info = getResponseMovie(id);
	console.log(info);
	appendFilmInfoToDOM(info);
	appendReviewToDOM(info);
}

async function getResponseMovie(id) {
	const request = await axios.get(`http://localhost:3001/movie?id=${id}`, { headers: { 'Authorization': localStorage.getItem('token') } });
	return request.data.data;
}

function appendFilmInfoToDOM(data) {
	const template = document.querySelector('#main-container').innerHTML
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
		.replace("{{homepage}}", data.homepage)
	const element = document.createElement('template');
	element.innerHTML = template;
	console.log(element);
	const info = document.querySelector('.main-info')
	info.append(element.content.firstChild);
}

function appendReviewToDOM(data) {
	data.reviews.forEach(item => {
		const template = document.querySelector('#reviews-content').innerHTML
			.replace("{{login}}", item.login)
			.replace("{{content}}", item.content)
		const element = document.createElement('template');
		element.innerHTML = template;
		console.log(element);
		const info = document.querySelector('.reviews')
		info.append(element.content.firstChild);
	})
}
