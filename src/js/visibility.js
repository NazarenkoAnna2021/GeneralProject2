
export function hideShowElement(form) {
	form.classList.toggle('none');
}

export function hideElement(form) {
	form.classList.add('none');
}

export function showElement(form) {
	form.classList.remove('none');
}

export function changeImg(url, dom) {
	dom.setAttribute('src', url);
}