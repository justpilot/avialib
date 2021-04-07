export interface altitudeOptions {
    value: number,
    unit: 'ft'|'m';
}

export default class Altitude
{
    private altitude; // DEFAULT [Feet]
    public constructor(options?: altitudeOptions) {
        if(options) {
            this.altitude = options.value * (options.unit == 'm'?3.28084:1);
        } else {
            this.altitude  = 0;
        }
    }

    public get meters(): number {
        return this.altitude / 3.2808;
    }

    public get feet(): number {
        return this.altitude;
    }
}