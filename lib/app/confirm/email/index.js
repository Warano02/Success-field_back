const main = require("./mailer");

/**
 *
 * @param {string} email : The email of who can receive a message
 * @param {string} object :that's a word that a users can precise in font to send a email. it's use into a programe so make sure that exist into a body of request
 * @param {string} subject : subject of the message
 * @param {string} title : A title of a page when a user read a message
 * @returns object : {err,msg} OR order 
 */

module.exports = main