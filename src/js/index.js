import "/css/filter.css"
import "/css/style.css"
import { DOM } from "./dom.js"
import { singIn, singUp } from "./singInFunctions"
import { constants } from "./constants"
import "./img"
import { openSignIn, preview } from "./preview"
import "./filter.js"
import {getFilters} from "./filter.js"

preview();

DOM.loginImg.addEventListener(constants.click, openSignIn);
DOM.singInButton.addEventListener(constants.click, singIn);
DOM.singUpButton.addEventListener(constants.click, singUp);
DOM.preview.addEventListener(constants.click, openSignIn);
DOM.bigButton.addEventListener(constants.click, getFilters);
