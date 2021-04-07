export interface densityOptions
{
    value: number,
    unit: 'kg/m^3'
}

export default class Airdensity
{
    private density: number;

    public constructor(options?: densityOptions) {
        if(options) {
            this.set(options);
        } else {
            this.density = 0;
        }
    }

    public set(options: densityOptions)
    {
        this.density = options.value;
    }

    public get kgm3() {
        return this.density;
    }
}