const mailV = ["gmail.com", "yahoo.cm", "yahoo.com"];
/**
 * 
 * @param {string} email 
 * @returns boolean
 */
vE = (email) => {
  const rest = (email) => {
    let i = email.split("").indexOf("@") + 1;
    let rest = "";
    for (; i < email.split("").length; i++) {
      rest += email.split("")[i];
    }
    return rest;
  };
  let i = 0;
  let find = false;
  while (i != mailV.length) {
    if (mailV[i] === rest(email)) {
      find = true;
      break;
    }
    i++;
  }
  return find;
};

module.exports=vE