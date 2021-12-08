
export function hideForm(form) {
	form.classList.add('none');
}

export function changeImg(url, dom) {
	dom.setAttribute('src', url);
}

export function showForm(form) {
	form.classList.remove('none');
}