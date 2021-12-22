import { DOM } from "./dom"
import { gif, constants } from "./constants";
import './img'

function randomGif():string {
    const randomNum: number = Math.round(Math.random() * 10);
    if (randomNum > 7 || randomNum === 0) return gif.gif2;
    return gif[`gif${randomNum}`];
}

export function preview(): void {
    DOM.preview.setAttribute(constants.src, randomGif());
}
