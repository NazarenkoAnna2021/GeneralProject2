import { DOM } from "./dom.js"

export function hideForm() {
    loginForm.classList.add('none');
}
export function singIn(e) {
    e.preventDefault();
    console.log('test');
}
export function singUp(e) {
    e.preventDefault();
}