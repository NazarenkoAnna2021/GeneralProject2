import "/css/style.css"
import "/css/filter.css"
import { DOM } from "./dom.js"
import { singIn, singUp } from "./singInFunctions"
import { click } from "./constants"
import "./img"
import { preview } from "./preview"
import "./filter.js"
import {getFilters} from "./filter.js"

DOM.loginImg.addEventListener(click, preview);
DOM.singInButton.addEventListener(click, singIn);
DOM.singUpButton.addEventListener(click, singUp);
DOM.bigButton.addEventListener('click', getFilters);
