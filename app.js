import AviaLib from "./avialib/avialib.js";
import Velocity from "./avialib/includes/velocity.js";
import Altitude from "./avialib/includes/altitude.js";

/*
 * Altitude Options
 * value: altitude value
 * unit: m = Meters, ft = Feet
*/
const altitudeOptions = {
    value: 25000,
    unit: 'ft'
}

const altitude = new Altitude(altitudeOptions);

/*
* Returns Temperature Object
*/

const isaTemperature = AviaLib.getISATemperature(altitude);

console.log(`ISA Temperature at ${altitude.feet} FT (° Celsius): `, isaTemperature.celsius);
console.log(`ISA Temperature at ${altitude.feet} FT (° Fahrenheit): `, isaTemperature.fahrenheit);

/*
* Returns Pressure Object
*/

const isaPressure = AviaLib.getISAPressure(altitude);

console.log(`ISA Pressure at ${altitude.feet} FT (hPa): `, isaPressure.hPa);
console.log(`ISA Pressure at ${altitude.feet} FT (inchHg): `, isaPressure.inchHg);

const speedOfSound = AviaLib.getSpeedOfSoundByAltitude(altitude);

console.log(`Speed of Sound at ${altitude.feet} FT (kts): `, speedOfSound.kts);
console.log(`Speed of Sound at ${altitude.feet} FT (kmh): `, speedOfSound.kmh);

// True Air Speed
const tas = new Velocity({
    value: 250,
    unit: 'kts'
});

const machNumber = AviaLib.getMachNumber(tas, speedOfSound);

console.log(`The M (Mach Number) at ${altitude.feet} FT at ${tas.kts} kts TAS: `, machNumber);