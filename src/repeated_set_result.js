
exports.handler = (event, context, callback) => {
    if (typeof(event.action_result) != 'object') {
        event.action_result = {result: event.action_result};
    }
    else {
      event.action_result = JSON.parse(event.action_result.body);
    }
    event.action_result['region'] = event.input.queryStringParameters.region;
    delete event.action_result["__authorizer"]
    event.result.push(event.action_result);
    callback(null, event);
};
