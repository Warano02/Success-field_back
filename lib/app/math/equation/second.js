const complex = require('complex.js')
const math = require('mathjs')
/**
 * 
 * @param {number} a :integer number
 * @param {number} b :integer number
 * @returns number
 */
function pgcd(a, b) {
    return b == 0 ? a : pgcd(b, a % b)
}
function quadraticRoot(a, b, c) {
    let sqrt = complex(b * b - 4 * a * c).sqrt()
    let x1 = complex(-b).add(sqrt).div(2 * a)
    let x2 = complex(-b).sub(sqrt).div(2 * a)
    return { x1, x2 }
}

/**
 * 
 * @param {number} a : ax²
 * @param {number} b : +bx
 * @param {number} c : +c
 * @returns object : Solve the equation ax²+bx+c and return false if one of that 3 parameters doesn't exist and object if else.
 */
function solve(a, b, c) {
    if (!a || !b || !c) {
        return false
    } else if (a == 0) {
        return { degre: 1, domain: "R", S: -b / c }
    } else {
        let d = b * b - 4 * a * c
        if (d == 0) {
            let S = math.fraction(-b, 2 * a).toString()
            return { S }
        } else if (d > 0) {
            const x1 = math.fraction((-b - math.sqrt(d)), 2 * a).toString()
            const x2 = math.fraction((-b + math.sqrt(d)), 2 * a).toString()
            return {degre:2,dommain:"R",S:`{${x1},${x2}}`}
        } else {
            let sqrt = complex(d).sqrt()
            let x1 = complex(-b).add(sqrt).div(2 * a)
            let x2 = complex(-b).sub(sqrt).div(2 * a)
            let x11=`${x1.re}+${x1.im}i`
            let x21=`${x2.re}+${x2.im}i`
            return {dege:2,dommain:"C",S:'{'+x11+','+x21+'}'}
        }
    }
}
module.exports={solve,pgcd}
 