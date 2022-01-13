import "/css/filter.css"
import "/css/style.css"
import {closePage, getCurrentFilmInfo} from './filmPageLogic';
import {DOM_PAGE} from "./pageDom";
import {constants} from "./constants";

getCurrentFilmInfo();
DOM_PAGE.headerSearch.disabled = true;
DOM_PAGE.searchImage.style.display = 'none';
DOM_PAGE.loginBtn.addEventListener(constants.click, closePage)
