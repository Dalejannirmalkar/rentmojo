let methods = {};
const https = require("https");

methods.asyncApiCall = api => {
  return new Promise((resolve, reject) => {
    https
      .get(api, resp => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", chunk => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          resolve(JSON.stringify(data).split("href="));
        });
      })
      .on("error", err => {
        console.log("Error: " + err.message);
      });
  });
};

module.exports = methods;
