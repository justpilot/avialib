export interface velocityOtpions {
    value: number,
    unit: 'kmh'|'kts'|'ms';
}

export default class Velocity
{
    private vilocity: number;   // Default [kts]

    public constructor(options?: velocityOtpions) {
        if(options) {
            this.set(options);
        } else {
            this.vilocity = 0;
        }
    }

    public set(options: velocityOtpions) {
        this.vilocity = options.value;

        if(options.unit == 'kmh') {
            this.vilocity *= 0.53995680346039;
        }

        switch (options.unit) {
            case 'kmh':
                this.vilocity *= 0.53995680346039;
                break;
            case 'ms':
                this.vilocity *= 1.9438444924574;
                break;

            default:
                break;
        }
    }

    get kts() {
        return Math.round(this.vilocity * 100) / 100;
    }

    get kmh() {
        return Math.round(this.vilocity * 1.851999999984 * 100) / 100;
    }

    get ms() {
        return Math.round(this.vilocity * 0.51444444444 * 100) / 100;
    }
}