export default class Altitude {
    constructor(options) {
        if (options) {
            this.altitude = options.value * (options.unit == 'm' ? 3.28084 : 1);
        }
        else {
            this.altitude = 0;
        }
    }
    get meters() {
        return this.altitude / 3.2808;
    }
    get feet() {
        return this.altitude;
    }
}
//# sourceMappingURL=altitude.js.map