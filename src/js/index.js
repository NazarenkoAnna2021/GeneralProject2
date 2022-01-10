import "/css/filter.css"
import "/css/style.css"
import { DOM } from "./dom.js"
import { singIn, singUp, openSignIn, signOut } from "./singInFunctions"
import { constants } from "./constants"
import "./img"
import { preview } from "./preview"
import { getFilters, resetFilters, openFilters } from "./filter.js"
import { switchNext } from "./gallery";

preview();

DOM.loginImg.addEventListener(constants.click, openSignIn);
DOM.singInButton.addEventListener(constants.click, singIn);
DOM.singUpButton.addEventListener(constants.click, singUp);
DOM.preview.addEventListener(constants.click, openSignIn);
DOM.loginImg.addEventListener(constants.click, signOut);
DOM.bigButton.addEventListener(constants.click, getFilters);
DOM.filterButton.addEventListener(constants.click, openFilters);
DOM.resetButton.addEventListener(constants.click, resetFilters);
DOM.paginationBtnNext.addEventListener(constants.click, switchNext);
DOM.searchImg.addEventListener(constants.click, getFilters);
