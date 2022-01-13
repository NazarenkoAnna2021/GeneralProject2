import "/css/filter.css"
import "/css/style.css"
import { closePage, getCurrentFilmInfo } from './filmPageLogic';
import { DOM_PAGE } from "./pageDom";
import { constants } from "./constants";
import { addReview, changeVisibilityEdding } from "./addReview";

getCurrentFilmInfo();
DOM_PAGE.loginBtn.addEventListener(constants.click, closePage);
DOM_PAGE.reviewsOpenButton.addEventListener(constants.click, changeVisibilityEdding)
DOM_PAGE.reviewsButton.addEventListener(constants.click, () => addReview(window.location.search.split('=')[1], DOM_PAGE.reviewInput.value));