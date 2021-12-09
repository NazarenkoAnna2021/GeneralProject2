import "/css/filter.css"
import "/css/style.css"
import { DOM } from "./dom.js"
import { singIn, singUp } from "./singInFunctions"
import { click } from "./constants"
import "./img"
import { openSignIn, preview } from "./preview"
import "./filter.js"
import {getFilters} from "./filter.js"

preview();

DOM.loginImg.addEventListener(click, openSignIn);
DOM.singInButton.addEventListener(click, singIn);
DOM.singUpButton.addEventListener(click, singUp);
DOM.preview.addEventListener(click, openSignIn);
DOM.bigButton.addEventListener('click', getFilters);
