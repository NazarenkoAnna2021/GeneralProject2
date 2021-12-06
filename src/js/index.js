import "/css/style.css"
import { DOM } from "./dom.js"
import { singIn, singUp } from "./singInFunctions"
import { click } from "./constants"
import "./img"

DOM.singInButton.addEventListener(click, singIn);
DOM.singUpButton.addEventListener(click, singUp);
