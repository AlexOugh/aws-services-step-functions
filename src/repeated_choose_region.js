
exports.handler = (event, context, callback) => {
    const region = event.regions.shift();
    event.num = event.regions.length;
    event.input.queryStringParameters.region = region;
    callback(null, event);
};
