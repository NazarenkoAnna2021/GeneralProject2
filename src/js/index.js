import "/css/filter.css"
import "/css/style.css"
import "./img"
import { DOM } from "./dom.js"
import { preview } from "./preview"
import { constants } from "./constants"
import { renderCards, trackScroll, scrollToTop } from "./gallery";
import {singIn, singUp, openSignIn, signOut, validation} from "./singInFunctions"
import { setGalleryByFilters, resetFilters, openFilters, getLanguages, getGenres } from "./filter.js"

preview();
setTimeout(() => openSignIn(), 1000);

DOM.singInButton.addEventListener(constants.click, singIn);
DOM.singUpButton.addEventListener(constants.click, singUp);
DOM.preview.addEventListener(constants.click, openSignIn);
DOM.loginImg.addEventListener(constants.click, signOut);
DOM.bigButton.addEventListener(constants.click, setGalleryByFilters);
DOM.filterButton.addEventListener(constants.click, openFilters);
DOM.resetButton.addEventListener(constants.click, resetFilters);
DOM.paginationBtnNext.addEventListener(constants.click, renderCards);
DOM.searchImg.addEventListener(constants.click, setGalleryByFilters);
DOM.goToTopButton.addEventListener(constants.click, scrollToTop);
window.addEventListener(constants.scroll, trackScroll);

getGenres();
getLanguages();