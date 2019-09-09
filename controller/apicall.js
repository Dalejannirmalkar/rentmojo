const apicall = require("../module/concurencycall");

exports.calling = async () => {
  return await apicall.callApi();
};
