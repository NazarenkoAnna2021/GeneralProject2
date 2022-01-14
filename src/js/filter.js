import { DOM } from "./dom.js";
import { hideShowElement } from "./visibility";
import { renderCards, cleanHTML, setCurrentPage } from "./gallery";
import { constants, filtersParams, pathmames, URL } from "./constants";
import { DoubleRange } from "./classes"
import axios from "axios";
const doubleRangeYear = new DoubleRange(constants.year, constants.yearGap);
const doubleRangeBudget = new DoubleRange(constants.budget, constants.budgetGap);
const doubleRangeRating = new DoubleRange(constants.rating, constants.ratingGap);

export const params = {
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

export function setGalleryByFilters() {
    params.adult = false;
    params.title = DOM.headerInput.value;
    params.genre = DOM.genresSelect.value;
    params.budget_min = doubleRangeBudget.getValue().budget_min;
    params.budget_max = doubleRangeBudget.getValue().budget_max;
    params.language = DOM.countrySelect.value;
    params.popularity_min = Math.round(doubleRangeRating.getValue().rating_min);
    params.popularity_max = Math.round(doubleRangeRating.getValue().rating_max);
    params.release_date_first = `${doubleRangeYear.getValue().year_min}-01-01`;
    params.release_date_last = `${doubleRangeYear.getValue().year_max}-12-31`;
    params.status = DOM.checkReleased.value;
    setCurrentPage(0);
    renderCards();
    cleanHTML();
    openFilters();
}

export function resetFilters() {
    DOM.headerInput.value = filtersParams.headerInputValue;
    doubleRangeYear.setValue(filtersParams.yearValueMin, filtersParams.yearValueMax);
    doubleRangeBudget.setValue(filtersParams.budgetValueMin, filtersParams.budgetValueMax);
    doubleRangeRating.setValue(filtersParams.ratingValueMin, filtersParams.ratingValueMax);
    // DOM.checkAdult.checked = filtersParams.checkAdultValue.value;
    DOM.countrySelect.value = filtersParams.countrySelectValue;
    DOM.genresSelect.value = filtersParams.genresSelectValue;
    DOM.statusSelect.value = filtersParams.statusSelectValue;
    DOM.filterButton.style.boxShadow = null;
}

export function openFilters() { hideShowElement(DOM.filtersForm) };

export async function getLanguages() {
    const res = await axios.get(`${URL.URL}${pathmames.languages}`, {
        headers: { 'Authorization': localStorage.getItem('token') },
    });
    res.data.data.forEach((a)=> {
        let option = document.createElement('option');
        option.textContent = a.iso_639_1;
        option.value = a.iso_639_1;
        DOM.countrySelect.appendChild(option);
    });
}


export async function getGenres() {
    const res = await axios.get(`${URL.URL}${pathmames.genres}`, {
        headers: { 'Authorization': localStorage.getItem('token') },
    });
    res.data.data.forEach((a)=> {
        let option = document.createElement('option');
        option.textContent = a.name;
        option.value = a.name;
        DOM.genresSelect.appendChild(option);
    });
}

DOM.headerInput.addEventListener('keydown', (event)=> {
    if (event.code === 'Enter') {
        setGalleryByFilters();
    }
});
