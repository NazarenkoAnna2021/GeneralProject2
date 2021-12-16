import "/css/filter.css"
import "/css/style.css"
import {DOM} from "./dom.js"
import {singIn, singUp} from "./singInFunctions"
import {constants} from "./constants"
import "./img"
import {openSignIn, preview} from "./preview"
import "./filter.js"
import {getFilters} from "./filter.js"
import {switchNext, switchPrev} from "./gallery";


preview();

DOM.loginImg.addEventListener(constants.click, openSignIn);
DOM.singInButton.addEventListener(constants.click, singIn);
DOM.singUpButton.addEventListener(constants.click, singUp);
DOM.preview.addEventListener(constants.click, openSignIn);
//pagination
DOM.paginationBtnPrev.addEventListener(constants.click, switchPrev);
DOM.paginationBtnNext.addEventListener(constants.click, switchNext);
//============
DOM.bigButton.addEventListener(constants.click, getFilters);

