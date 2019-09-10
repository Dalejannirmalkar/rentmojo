const config = require("config");
const depth = config.get("depth");
const asyncFun = require("../lib/asycApiCreate");
let magicString = require("../lib/magicstring").countCalls;
const database = require("../module/database");

let methods = {};
let countCall = 0;
methods.trimResponse = apiResponse => {
  let stringFind = apiResponse.substring(0, apiResponse.indexOf(">"));
  if (
    stringFind.includes("medium.com") &&
    !stringFind.includes(".png") &&
    !stringFind.includes(".jpg") &&
    !stringFind.includes(".css") &&
    ((stringFind.includes("?") && stringFind.includes(" ")) ||
      (!stringFind.includes("?") && !stringFind.includes(" ")))
  ) {
    if (stringFind.includes("data-"))
      stringFind = stringFind.substring(0, stringFind.indexOf("data-") - 1);
    stringFind = stringFind.replace(new RegExp("\\\\", "g"), "");
    if (stringFind.includes(";"))
      stringFind = stringFind.substring(0, stringFind.indexOf(";"));
    stringFind = stringFind.replace(new RegExp('"', "g"), "");
    return stringFind;
  }
  return false;
};
methods.createUrlEntry = async url => {
  let apiUrlAndStuff = String(url).split("?");
  let params = [];
  let apiUrl = apiUrlAndStuff[0];

  if (apiUrlAndStuff.length > 1 && !apiUrlAndStuff[1].includes("https"))
    params = apiUrlAndStuff[1]
      .split("&")
      .map(res => res.substring(0, res.indexOf("=")));

  if (apiUrlAndStuff.length > 1 && apiUrlAndStuff[1].includes("https"))
    params = apiUrlAndStuff[1].split("=")[0];

  console.log(params);
  let checkUrlEntry = await database.findOne({ url: apiUrl });
  if (checkUrlEntry) {
    if (params.length) {
      let newParams = JSON.parse(JSON.stringify(checkUrlEntry.params));

      let lengthOfExistParam = newParams.length;

      for (let eachParam of params) {
        if (!newParams.indexOf(eachParam)) newParams.push(eachParam);
      }
      if (newParams.length > lengthOfExistParam)
        return await database.updateOne(
          { url: apiUrl },
          { $set: { params: params } }
        );
    }

    return true;
  } else {
    return await database.apiCallCreate({ url: apiUrl, params: params });
  }
};
methods.callApi = async getApiForCall => {
  try {
    let apiResponse = await asyncFun.asyncApiCall(getApiForCall);
    let promiseArray = [];
    let countForCall = 0;
    let apiCallArray = [];
    for (let i = 0; i < apiResponse.length; i++) {
      let check = await methods.trimResponse(apiResponse[i]);
      if (check) await methods.createUrlEntry(check);
      if (check) {
        if (countCall < depth) {
          if (countForCall == 5) {
            promiseArray.push(apiCallArray);
          } else {
            apiCallArray.push(methods.callApi(check));
          }
        }
      }
    }
    if (promiseArray.length) {
      for (let eachCalls of promiseArray) {
        await Promise.all(eachCalls);
      }
    }
    countCall++;
    return;
  } catch (e) {
    return;
  }
};

module.exports = methods;
