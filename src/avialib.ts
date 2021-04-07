import Temperature, {temperatureOptions} from "./includes/temperature.js";
import Altitude, {altitudeOptions} from "./includes/altitude.js";
import Pressure, {pressureOptions} from "./includes/pressure.js";
import Density from "./includes/airdensity.js";
import Velocity from "./includes/velocity.js";

export default class AviaLib
{
    // International Standard Atmosphere (ISA) - Temperature
    public static getISATemperature(altitude: Altitude): Temperature
    {
        const temperature = new Temperature();
        let result: number;

        if(altitude.feet <= 36000) {
            result = 15 - altitude.feet / 1000 * 1.98;
        } else if(altitude.feet <= 65000) {
            result = -56.5;
        } else {
            result = -56.5 + (altitude.feet / 1000 - 65) * 0.3;
        }

        temperature.set({ value: result, unit: 'C' });
        return temperature;
    }

    // International Standard Atmosphere (ISA) - Pressure
    public static getISAPressure(altitude: Altitude): Pressure
    {
        const pressure = new Pressure();

        let result: number;

        if(altitude.feet <= 36000) {
            result = 101325 * Math.pow(1 - 2.25569 * Math.pow(10, -5) * altitude.meters, 5.25616);
        } else{
            result = 0.223356 * 101325 * Math.pow(Math.E, -0.000157688*(altitude.meters - 11000));
        }

        pressure.set({ value: result, unit: 'P'});

        return pressure;
    }

    // Get Speed of Sound
    public static getSpeedOfSound(temperature: Temperature): Velocity
    {
        const c = new Velocity();

        c.set({
            value: Math.sqrt(1.4 * 287.058 * temperature.kelvin),
            unit: 'ms'
        });

        return c;
    }

    public static getSpeedOfSoundByAltitude(altitude: Altitude): Velocity
    {
        const temperature = this.getISATemperature(altitude);
        return this.getSpeedOfSound(temperature);
    }

    // Get Mach Number
    public static getMachNumber(trueVelocity: Velocity, speedOfSound: Velocity): number
    {
        return Math.round(trueVelocity.kts / speedOfSound.kts * 100) / 100;
    }

    // Get Equivalent airspeed (EAS)
    public static getEAS(IAS: Velocity, altitude: Altitude): Velocity
    {
        // Standard sea level density [kg/m³]
        const rho_0 = 1.225;

        // Actual Air Density
        const rho = this.getDensityByAltitude(altitude).kgm3;

        // Dynamic Pressure
        const q = 0.5 * rho * Math.pow(IAS.ms, 2);

        const EAS = new Velocity({
            value: Math.sqrt(2*q / rho_0),
            unit: 'ms'
        });

        return EAS;
    }

    // GET True airspeed (TAS)
    public static getTAS(IAS: Velocity, altitude: Altitude): Velocity
    {
        const EAS = this.getEAS(IAS, altitude);

        // speed of sound at standard sea level (m/s)
        const alpha_0 = 340.29;

        // Mach Number
        const M = this.getMachNumber();

        return new Velocity({
            value: alpha_0 * M,
            unit: 'ms'
        });
    }

    // Get Air Density
    public static getDensity(pressure: Pressure, temperature: Temperature): Density
    {
        const denisty = new Density({
            value: pressure.Pa / (287.058 * temperature.kelvin),
            unit: 'kg/m^3'
        });

        return denisty;
    }

    public static getDensityByAltitude(altitude: Altitude): Density
    {
        return this.getDensity(this.getISAPressure(altitude), this.getISATemperature(altitude));
    }
}