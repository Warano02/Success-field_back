/**
 *
 * @param {string} num : A phone number of cameroon that whe need to verify
 * @returns boolean : return true if a number is valid and false ortherwise
 */
function cameroon_number(num) {
    const to = num.split("");
    if (to.length < 9 || (to.length > 9 && to.length < 12) || to.length > 13) {
        return false;
    } else {
        const nbr = to.length;
        switch (nbr) {
            case 9:
                if (to[0] !== "6") {
                    return false;
                } else {
                    return true;
                }
                break;
            case 12:
                if (to[0] === "0" && to[1] === "0" && to[2] === "0" && to[3] === "6") {
                    return true;
                } else {
                    return false;
                }
                break;
            case 13:
                if (
                    to[0] !== "+" ||
                    to[1] !== "2" ||
                    to[2] !== "3" ||
                    to[3] !== "7" ||
                    to[4] !== "6"
                ) {
                    return false;
                } else {
                    return true;
                }
                break;
            default:
                return false;
                break;
        }
    }
};

module.exports=cameroon_number