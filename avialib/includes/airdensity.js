export default class Airdensity {
    constructor(options) {
        if (options) {
            this.set(options);
        }
        else {
            this.density = 0;
        }
    }
    set(options) {
        this.density = options.value;
    }
    get kgm3() {
        return this.density;
    }
}
//# sourceMappingURL=airdensity.js.map