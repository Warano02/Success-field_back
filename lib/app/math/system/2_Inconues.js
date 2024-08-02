const { pgcd } = require('../equation/second')
const math = require("mathjs")
const Complex = require('complex.js')
/**
 * 
 * @param {number} a 
 * @param {number} b 
 * @param {number} c 
 * @param {number} d 
 * @param {number} e 
 * @param {number} f 
 * @returns object
 */
function solveNormal(a, b, c, d, e, f) {
    let Delta = a * e - b * d
    if (Delta == 0) {
        return { S: "{}", msg: "Le système que vous avez proposer n'admet pas de solution" }
    } else {
        let DeltaX = c * e - b * f
        let Pgcd1 = pgcd(DeltaX, Delta)
        let X = (DeltaX % Delta == 0) ? DeltaX / Delta : `${DeltaX / Pgcd1}/${Delta / Pgcd1}`
        let DeltaY = a * f - c * e
        Pgcd1 = pgcd(DeltaY, Delta)
        let Y = (DeltaY % Delta == 0) ? DeltaY / Delta : `${DeltaY / Pgcd1}/${Delta / Pgcd1}`
        return { S: `{${X},${Y}}`, msg: "Votre système à bien été resolue" }
    }
}

module.exports={solveNormal}
