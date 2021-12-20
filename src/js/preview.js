import { DOM } from "./dom"
import { gif, constants } from "./constants";
import './img'
import * as visibility from './visibility'
import {isAuthorised} from "./singInFunctions";
import {hideForm, showForm} from "./visibility";

function randomGif() {
    const randomNum = Math.round(Math.random() * 10);
    switch (randomNum) {
        case 1: return gif.gif1;
        case 2: return gif.gif2;
        case 3: return gif.gif3;
        case 4: return gif.gif4;
        case 5: return gif.gif5;
        case 6: return gif.gif6;
        case 7: return gif.gif7;
        default: return gif.gif1;
    }
}

export function preview() {
    DOM.preview.firstChild.setAttribute(constants.src, randomGif());
}

export function openSignIn() {
    visibility.hideForm(DOM.preview);
    visibility.showForm(DOM.modalIcon);
    isAuthorised()
}
