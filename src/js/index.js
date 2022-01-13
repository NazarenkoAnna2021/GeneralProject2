import "/css/filter.css"
import "/css/style.css"
import "./img"
import { DOM } from "./dom.js"
import { preview } from "./preview"
import { constants } from "./constants"
import {renderCards, renderNextPage} from "./gallery";
import { singIn, singUp, openSignIn, signOut } from "./singInFunctions"
import {setGalleryByFilters, resetFilters, openFilters, applyFilters} from "./filter.js"
preview();

DOM.loginImg.addEventListener(constants.click, openSignIn);
DOM.singInButton.addEventListener(constants.click, singIn);
DOM.singUpButton.addEventListener(constants.click, singUp);
DOM.preview.addEventListener(constants.click, openSignIn);
DOM.loginImg.addEventListener(constants.click, signOut);
DOM.bigButton.addEventListener(constants.click, applyFilters);
DOM.filterButton.addEventListener(constants.click, openFilters);
DOM.resetButton.addEventListener(constants.click, resetFilters);

DOM.paginationBtnNext.addEventListener(constants.click, renderNextPage);
DOM.searchImg.addEventListener(constants.click, applyFilters);
