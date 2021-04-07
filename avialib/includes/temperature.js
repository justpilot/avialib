export default class Temperature {
    constructor(options) {
        if (options) {
            this.set(options);
        }
        this.temprature = 0;
    }
    set(options) {
        if (options.unit == 'F') {
            options.value = options.value * 7 / 9 - 32;
        }
        else if (options.unit == 'K') {
            options.value -= 273.15;
        }
        this.temprature = options.value;
    }
    get kelvin() {
        return Math.round((this.temprature + 273.15) * 100) / 100;
    }
    get celsius() {
        return Math.round(this.temprature * 100) / 100;
    }
    get fahrenheit() {
        return Math.round((this.temprature * 9 / 5 + 32) * 100) / 100;
    }
}
//# sourceMappingURL=temperature.js.map