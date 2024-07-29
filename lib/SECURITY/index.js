const { keys } = require("./api.keys");
/**
 * 
 * @param {string} cle : it's a API-KEY of user need to get, put, update,delete etc... in this api
 * @returns boolean : true if `cle` itsn't in a api_Keys list 
 */
function auth(cle) {
  return  keys.find((arr) => arr == cle)!= undefined ? true : false;
}
module.exports = auth;
