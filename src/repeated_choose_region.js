
exports.handler = (event, context, callback) => {
    const region = event.regions.shift();
    event.num = event.regions.length;
    event.input.queryStringParameters.region = region;
    var body = JSON.parse(event.input.body);
    body.region = region;
    event.input.body = JSON.stringify(body);
    callback(null, event);
};
