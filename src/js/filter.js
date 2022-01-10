import { DOM } from "./dom.js";
import { hideShowElement } from "./visibility";
import { cleanHTML, renderCards, renderPagination } from "./gallery";
import {URL} from "./constants";
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
    const str = `movie?language=${DOM.countrySelect.value}&status=${DOM.checkReleased.value}&budget_min=${doubleRangeBudget.getValue().budget_min}&budget_max=${doubleRangeBudget.getValue().budget_max}&release_date_first=${doubleRangeYear.getValue().year_min}.01.01&release_date_last=${doubleRangeYear.getValue().year_max}.01.01&title=${DOM.headerInput.value}`.trim();
    console.log(str);
    DOM.filterButton.style.boxShadow = '0 0 20px white'
    sendData(str);
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
async function sendData(str) {
    const response = await axios.get(`${URL.URL}/${str}`, {
        headers: {
            'token': localStorage.getItem('token'),
        }
    });
    const result = await response.json();
    console.log(result)
    cleanHTML()
    await renderCards(result);
    await renderPagination(result);
}
