
exports.handler = (event, context, callback) => {
  var results = {};
  Object.keys(event.resources).forEach(function(key) {
    results[key] = event.resources[key].result;
  });
  event.results = results;
  callback(null, event);
};
