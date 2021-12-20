import { DOM } from "./dom.js"
import { hideForm, showForm } from "./visibility"

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
    //console.log(DOM.searchInput.value);
    console.log(doubleRangeYear.getValue());
    console.log(doubleRangeBudget.getValue());
    console.log(doubleRangeRating.getValue());
    console.log(DOM.checkAdult.checked);
    console.log(DOM.countrySelect.value);
    console.log(DOM.genresSelect.value);
    console.log(DOM.statusSelect.value);
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
export function openFilters() {showForm(DOM.filtersForm)}
const doubleRangeYear = new DoubleRange('year');
const doubleRangeBudget = new DoubleRange('budget');
const doubleRangeRating = new DoubleRange('rating');

