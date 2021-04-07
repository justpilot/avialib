export interface pressureOptions {
    value: number,
    unit: 'P';
}

export default class Pressure
{
    private pressure: number;

    public constructor(options?: pressureOptions)
    {
        if(options) {
            this.set(options);
        } else {
            this.pressure = 0;
        }
    }

    public set(options: pressureOptions): Pressure
    {
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