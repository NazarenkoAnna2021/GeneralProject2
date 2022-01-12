import { DOM } from "./dom.js";
import { hideShowElement } from "./visibility";
import {cleanHTML, drawCards, renderCards, renderPagination} from "./gallery";
import {URL ,constants, pathmames, filtersParams } from "./constants";
import axios from "axios";
import { DoubleRange } from "./classes"
import {getResponseMoviePage} from "./gallery"

const doubleRangeYear = new DoubleRange(constants.year, constants.yearGap);
const doubleRangeBudget = new DoubleRange(constants.budget, constants.budgetGap);
const doubleRangeRating = new DoubleRange(constants.rating, constants.ratingGap);

export function setGalleryByFilters() {
    const params = {
        adult: false,
        title: DOM.headerInput.value,
        genre: DOM.genresSelect.value,
        budget_min: doubleRangeBudget.getValue().budget_min,
        budget_max: doubleRangeBudget.getValue().budget_max,
        language: DOM.countrySelect.value,
        popularity_min: Math.round(doubleRangeRating.getValue().rating_min),
        popularity_max: Math.round(doubleRangeRating.getValue().rating_max),
        release_date_first: `${doubleRangeYear.getValue().year_min}-01-01`,
        release_date_last: `${doubleRangeYear.getValue().year_max}-12-31`,
        status: DOM.checkReleased.value
    }
    renderCards(params)
}

export function resetFilters() {
    DOM.headerInput.value = filtersParams.headerInputValue;
    doubleRangeYear.setValue(filtersParams.yearValueMin, filtersParams.yearValueMax);
    doubleRangeBudget.setValue(filtersParams.budgetValueMin, filtersParams.budgetValueMax);
    doubleRangeRating.setValue(filtersParams.ratingValueMin, filtersParams.ratingValueMax);
    DOM.checkAdult.checked = filtersParams.checkAdultValue;
    DOM.countrySelect.value = filtersParams.countrySelectValue;
    DOM.genresSelect.value = filtersParams.genresSelectValue;
    DOM.statusSelect.value = filtersParams.statusSelectValue;
    DOM.filterButton.style.boxShadow = null
}

export function openFilters() { hideShowElement(DOM.filtersForm) };

// async function sendData(params) {
//     const response = await axios.get(URL.URL.concat(pathmames.movies),{
//             headers: { 'Authorization': localStorage.getItem(constants.token) },
//             params: params
//         });
//     cleanHTML()
//     console.log(response.data.data.data)
//     drawCards(response.data.data.data);
// }

