const apicall = require("../module/concurencycall");
const config = require("config");
const getApiForCall = config.get("apiforCall");

exports.calling = async (req, res) => {
  await apicall.callApi(getApiForCall, (count = 0));
  res.send({ status: true });
};
