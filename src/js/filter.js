import { DOM } from "./dom.js";
import { hideShowElement } from "./visibility";
import { cleanHTML, renderCards, renderPagination } from "./gallery";
import { URL } from "./constants";
import axios from "axios";

class DoubleRange {
    constructor(container, gap) {
        this.container = container;
        this.sliderOne = document.querySelector(`.${this.container} .slider-1`);
        this.sliderTwo = document.querySelector(`.${this.container} .slider-2`);
        this.displayValOne = document.querySelector(`.${this.container} .range1`);
        this.displayValTwo = document.querySelector(`.${this.container} .range2`);
        this.minGap = gap;
        this.sliderTrack = document.querySelector(`.${this.container} .slider-track`);
        this.sliderMaxValue = this.sliderOne?.max;
        this.slideOne = this.slideOne.bind(this);
        this.slideTwo = this.slideTwo.bind(this);
        this.sliderOne.addEventListener('input', this.slideOne);
        this.sliderTwo.addEventListener('input', this.slideTwo);
        window.addEventListener('load', this.slideOne);
        window.addEventListener('load', this.slideTwo);
    }
    slideOne() {
        if (Number(this.sliderTwo.value) - Number(this.sliderOne.value) <= this.minGap) {
            this.sliderOne.value = Number(this.sliderTwo.value) - this.minGap;
        }
        this.displayValOne.textContent = this.sliderOne.value;
    }
    slideTwo() {
        if (Number(this.sliderTwo.value) - Number(this.sliderOne.value) <= this.minGap) {
            this.sliderTwo.value = Number(this.sliderOne.value) + this.minGap;
        }
        this.displayValTwo.textContent = this.sliderTwo.value;
    }
    getValue() {
        return {
            [`${this.container}_min`]: Number(this.sliderOne.value),
            [`${this.container}_max`]: Number(this.sliderTwo.value)
        };
    }
    setValue(min, max) {
        this.sliderOne.value = min;
        this.sliderTwo.value = max;
        this.slideOne();
        this.slideTwo();
    }
}

export function getFilters() {
    const params = {
        params:
        {
            adult: ,
            title: paramsForFilter.title,
            genre: paramsForFilter.genre,
            page: paramsForFilter.page,
            pre_page: paramsForFilter.pre_page,
            budget_min: paramsForFilter.budget_min,
            budget_max: paramsForFilter.budget_max,
            language: paramsForFilter.language,
            popularity_min: paramsForFilter.popularity_min,
            popularity_max: paramsForFilter.popularity_max,
            release_date_first: paramsForFilter.release_date_first,
            release_date_last: paramsForFilter.release_date_last,
            revenue_min: paramsForFilter.revenue_min,
            revenue_max: paramsForFilter.revenue_max,
            status: paramsForFilter.status
        }
    }
    sendData(params);
}

export function resetFilters() {
    DOM.headerInput.value = '';
    doubleRangeYear.setValue(1895, 2022);
    doubleRangeBudget.setValue(0, 190000000);
    doubleRangeRating.setValue(0, 10);
    DOM.checkAdult.checked = false;
    DOM.countrySelect.value = '';
    DOM.genresSelect.value = '';
    DOM.statusSelect.value = '';
    DOM.filterButton.style.boxShadow = null
}
export function openFilters() { hideShowElement(DOM.filtersForm) };

const doubleRangeYear = new DoubleRange('year', 5);
const doubleRangeBudget = new DoubleRange('budget', 10000000);
const doubleRangeRating = new DoubleRange('rating', 1);

async function sendData(params) {
    const response = await axios.get(`${URL.URL}/movies`,
        { headers: { 'Authorization': localStorage.getItem('token') } }, params
        );
    const result = response.data;
    console.log(result)
    cleanHTML()
    await renderCards(result);
    await renderPagination(result);
}
