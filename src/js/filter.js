import { DOM } from "./dom.js"
import { hideShowElement } from "./visibility"
let str = '';
import {cleanHTML, current, renderCards, renderPagination} from "./gallery";


class DoubleRange {
    constructor(container) {
        this.container = container;
        this.sliderOne = document.querySelector(`.${this.container} .slider-1`);
        this.sliderTwo = document.querySelector(`.${this.container} .slider-2`);
        this.displayValOne = document.querySelector(`.${this.container} .range1`);
        this.displayValTwo = document.querySelector(`.${this.container} .range2`);
        this.minGap = 0;
        this.sliderTrack = document.querySelector(`.${this.container} .slider-track`);
        this.sliderMaxValue = this.sliderOne?.max;
        this.slideOne = this.slideOne.bind(this);
        this.slideTwo = this.slideTwo.bind(this);
        this.sliderOne.addEventListener('input', this.slideOne);
        this.sliderTwo.addEventListener('input', this.slideTwo);
        window.addEventListener('load', this.slideOne);
        window.addEventListener('load', this.slideTwo);
    }
    slideOne(){
        if(Number(this.sliderTwo.value) - Number(this.sliderOne.value) <= this.minGap){
            this.sliderOne.value = Number(this.sliderTwo.value) - this.minGap;
        }
        this.displayValOne.textContent = this.sliderOne.value;
    }
    slideTwo(){
        if(Number(this.sliderTwo.value) - Number(this.sliderOne.value) <= this.minGap){
            this.sliderTwo.value = Number(this.sliderOne.value) + this.minGap;
        }
        this.displayValTwo.textContent = this.sliderTwo.value;
    }
    getValue() {
        return {[`${this.container}_min`] : Number(this.sliderOne.value), 
                [`${this.container}_max`] : Number(this.sliderTwo.value)};
    }
    setValue(min, max) {
        this.sliderOne.value = min;
        this.sliderTwo.value = max;
        this.slideOne();
        this.slideTwo();
    }
}

export function getFilters() {
    str = `movie?language=${DOM.countrySelect.value}&status=${DOM.statusSelect.value}&budget_min=${doubleRangeBudget.getValue().budget_min}&budget_max=${doubleRangeBudget.getValue().budget_max}&release_date_first=${doubleRangeYear.getValue().year_min}.01.01&release_date_last=${doubleRangeYear.getValue().year_max}.01.01&title=${DOM.headerInput.value}`
    sendData()
}

export function resetFilters() {
    DOM.headerInput.value = '';
    doubleRangeYear.setValue(1895, 2022);
    doubleRangeBudget.setValue(0, 400);
    doubleRangeRating.setValue(0, 10);
    DOM.checkAdult.checked = false;
    DOM.countrySelect.value = 'all';
    DOM.genresSelect.value = 'all';
    DOM.statusSelect.value = 'all';
}
export function openFilters() {hideShowElement(DOM.filtersForm)};
const doubleRangeYear = new DoubleRange('year');
const doubleRangeBudget = new DoubleRange('budget');
const doubleRangeRating = new DoubleRange('rating');

async function sendData()
{
    let response = await fetch(`https://wowmeup.pp.ua/${str}`);
    let result = await response.json();
    console.log(result)
    cleanHTML()
    await renderCards(result);
    await renderPagination(result);
}
