const date = new Date();
let heure = `${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`
/**
 * 
 * @param {string} heure :Form of M-d-H-m = month-day-hours-minutes. 
 * @returns string : return a formated hours. For exemple 19m represent a publication or comment was published in 19 minutes. 
 */
function Hours(published) {
    let hours = published.split('-')
    let heu = heure.split('-')
    let r
    if (hours[0] < heu[0]) {
        r = heu[0] - hours[0]
        return `${r}M`
    } else if (hours[1] < heu[1]) {
        r = heu[1] - hours[1]
        return `${r}j`
    } else if (hours[2] < heu[2]) {
        r = heu[2] - hours[2]
        return `${r}h`
    } else {
        r = heu[3] - hours[3]
        return r>0?`${r}m`:`${r*-1}m`
    }
}
module.exports = Hours
