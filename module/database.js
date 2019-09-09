const mongoose = require("mongoose");
const config = require("config");
const mongoConfig = config.get("mongo");
const magicString = require("../lib/magicstring").magicString;
let methods = {};

mongoose.connect(mongoConfig.mongourl, { useNewUrlParser: true }, function(
  err
) {
  if (err) throw err;
  console.log(magicString.connected);
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on(
  magicString.errorKey,
  console.error.bind(console, magicString.connectionError)
);
db.once(magicString.openKey, function() {
  // we're connected!
});

let apiCallCreate = mongoose.Schema({
  api: { unique: true, type: String },
  params: [String]
});

let apiCallCreateSchem = mongoose.model(mongoConfig.tabelname, apiCallCreate);

methods.apiCallCreate = async data => {
  let apiList = new apiCallCreateSchem(data);
  return apiList.save(data);
};
methods.findOne = async data => {
  return apiCallCreateSchem.findOne(data);
};
methods.updateOne = async (query, data) => {
  return apiCallCreateSchem.updateOne(query, data);
};
module.exports = methods;
