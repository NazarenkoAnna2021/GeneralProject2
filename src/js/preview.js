import { DOM } from "./dom"
import './img'
import * as visibility from './visibility'

function randomGif(){
    const randomNum = Math.random();
    switch(true){
        case randomNum >= 0 && randomNum <= 0.5: return '/img/dribbble.gif';
        case randomNum > 0.5: return '/img/preview.gif';
    }
}

export function preview(){
    DOM.preview.firstChild.setAttribute('src', randomGif());
}

export function openSignIn(){
    visibility.hideForm(DOM.preview);
    visibility.showForm(DOM.modalIcon);
}