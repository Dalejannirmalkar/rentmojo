const config = require("config");
const getApiForCall = config.get("apiforCall");
const asyncFun = require("../lib/asycApiCreate");

let methods = {};
methods.callApi = async () => {
  let api_response = await asyncFun.asyncApiCall(getApiForCall);
  let findArray = [];
  for (let i = 0; i < api_response.length; i++) {
    let stringFind = api_response[i].substring(0, api_response[i].indexOf(">"));
    if (stringFind.includes("medium.com")) {
      stringFind = stringFind.replace(new RegExp("\\\\", "g"), "");
      if (stringFind.includes(";"))
        stringFind = stringFind.substring(0, stringFind.indexOf(";"));
      stringFind = stringFind.replace(new RegExp('"', "g"), "");
      findArray.push(stringFind);
    }
  }
  console.log(findArray);
};
module.exports = methods;
