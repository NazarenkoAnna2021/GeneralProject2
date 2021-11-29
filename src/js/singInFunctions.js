import { DOM } from "./dom"

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