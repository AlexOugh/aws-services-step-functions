
exports.handler = (event, context, callback) => {
  // we've got all outputs of the parallel actions, so merge results to the first action's output
  var firstActionEvent = event[0];
  event.forEach(function(actionEvent) {
    Object.keys(actionEvent.resources).forEach(function(key) {
      if (actionEvent.resources[key].action_result) {
        var result = actionEvent.resources[key].action_result.body;
        result['region'] = actionEvent.resources[key].input.queryStringParameters.region;
        firstActionEvent.resources[key].result.push(result);
        firstActionEvent.resources[key].action_result = null;
      }
    });
  });
  callback(null, firstActionEvent);
};
