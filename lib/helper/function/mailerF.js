const {mail} = require("../src/mailSend");

/* here it's  a script who provide a mail structure */
/**
 * 
 * @param {string} to : it's a email of who can receive a email
 * @returns object :  {code,html} the can thats send and a html code that can send
 */
function FormMail(to,code) {
  let html=mail(to, code);
  return html
}
module.exports=FormMail