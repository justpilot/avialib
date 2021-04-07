export interface temperatureOptions {
    value: number,
    unit: 'C'|'F'|'K';
}

export default class Temperature
{
    private temprature: number; // DEFAULT: [° Celsius]

    public constructor(options?: temperatureOptions|null)
    {
        if(options) {
            this.set(options);
        }

        this.temprature = 0;
    }

    public set(options: temperatureOptions)
    {
        if(options.unit == 'F') {
            options.value = options.value*7/9 - 32;
        }  else if (options.unit == 'K') {
            options.value -= 273.15;
        }
        this.temprature = options.value;
    }

    get kelvin(): number {
        return Math.round((this.temprature + 273.15) * 100) / 100;
    }

    get celsius(): number {
        return Math.round(this.temprature*100) / 100;
    }

    get fahrenheit(): number {
        return Math.round((this.temprature * 9 / 5 + 32) * 100) / 100;
    }
}