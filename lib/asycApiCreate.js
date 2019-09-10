let methods = {};
const https = require("https");

methods.asyncApiCall = async api => {
  console.log(api);
  if (!api.includes("https")) api = api.replace(/http/g, "https");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      https
        .get(api, resp => {
          console.log(api, " ==");
          let data = "";
          resp.on("data", chunk => {
            data += chunk;
          });
          resp.on("end", () => {
            resolve(JSON.stringify(data).split("href="));
          });
        })
        .on("error", err => {
          console.log("Error: " + err);
        });
    });
  }, 500);
};

module.exports = methods;
