export class DoubleRange {
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
};