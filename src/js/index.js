import "/css/style.css"
import { DOM } from "./dom.js"
import { singIn, singUp, hideForm } from "./singInFunctions"
import { click } from "./constants"
import "./gallery.js"


DOM.singInButton.addEventListener(click, singIn);
DOM.singUpButton.addEventListener(click, singUp);
