export default class Pressure {
    constructor(options) {
        if (options) {
            this.set(options);
        }
        else {
            this.pressure = 0;
        }
    }
    set(options) {
        this.pressure = options.value;
        return this;
    }
    get hPa() {
        return Math.round(this.pressure * 0.01 * 100) / 100;
    }
    get Pa() {
        return Math.round(this.pressure * 100) / 100;
    }
    get inchHg() {
        return Math.round(this.pressure * 0.00029529983071445 * 100) / 100;
    }
}
//# sourceMappingURL=pressure.js.map