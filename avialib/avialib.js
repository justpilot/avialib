import Temperature from "./includes/temperature.js";
import Pressure from "./includes/pressure.js";
import Density from "./includes/airdensity.js";
import Velocity from "./includes/velocity.js";
export default class AviaLib {
    // International Standard Atmosphere (ISA) - Temperature
    static getISATemperature(altitude) {
        const temperature = new Temperature();
        let result;
        if (altitude.feet <= 36000) {
            result = 15 - altitude.feet / 1000 * 1.98;
        }
        else if (altitude.feet <= 65000) {
            result = -56.5;
        }
        else {
            result = -56.5 + (altitude.feet / 1000 - 65) * 0.3;
        }
        temperature.set({ value: result, unit: 'C' });
        return temperature;
    }
    // International Standard Atmosphere (ISA) - Pressure
    static getISAPressure(altitude) {
        const pressure = new Pressure();
        let result;
        if (altitude.feet <= 36000) {
            result = 101325 * Math.pow(1 - 2.25569 * Math.pow(10, -5) * altitude.meters, 5.25616);
        }
        else {
            result = 0.223356 * 101325 * Math.pow(Math.E, -0.000157688 * (altitude.meters - 11000));
        }
        pressure.set({ value: result, unit: 'P' });
        return pressure;
    }
    // Get Speed of Sound
    static getSpeedOfSound(temperature) {
        const c = new Velocity();
        c.set({
            value: Math.sqrt(1.4 * 287.058 * temperature.kelvin),
            unit: 'ms'
        });
        return c;
    }
    static getSpeedOfSoundByAltitude(altitude) {
        const temperature = this.getISATemperature(altitude);
        return this.getSpeedOfSound(temperature);
    }
    // Get Mach Number
    static getMachNumber(trueVelocity, speedOfSound) {
        return Math.round(trueVelocity.kts / speedOfSound.kts * 100) / 100;
    }
    // Get Equivalent airspeed (EAS)
    static getEAS(IAS, altitude) {
        // Standard sea level density [kg/m³]
        const rho_0 = 1.225;
        // Actual Air Density
        const rho = this.getDensityByAltitude(altitude).kgm3;
        // Dynamic Pressure
        const q = 0.5 * rho * Math.pow(IAS.ms, 2);
        const EAS = new Velocity({
            value: Math.sqrt(2 * q / rho_0),
            unit: 'ms'
        });
        return EAS;
    }
    // GET True airspeed (TAS)
    static getTAS(IAS, altitude) {
        const EAS = this.getEAS(IAS, altitude);
        // speed of sound at standard sea level (m/s)
        const alpha_0 = 340.29;
        return new Velocity({
            value: alpha_0 * M,
            unit: 'ms'
        });
    }
    // Get Air Density
    static getDensity(pressure, temperature) {
        const denisty = new Density({
            value: pressure.Pa / (287.058 * temperature.kelvin),
            unit: 'kg/m^3'
        });
        return denisty;
    }
    static getDensityByAltitude(altitude) {
        return this.getDensity(this.getISAPressure(altitude), this.getISATemperature(altitude));
    }
}
//# sourceMappingURL=avialib.js.map