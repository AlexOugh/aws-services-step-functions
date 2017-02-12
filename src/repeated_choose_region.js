
exports.handler = (event, context, callback) => {
  const region = event.regions.shift();
  event.num = event.regions.length;
  Object.keys(event.resources).forEach(function(key) {
    event.resources[key].input.body.region = region;
    event.resources[key].input.queryStringParameters.region = region;
  });
  /* {
    regions: [],
    num: 0,
    resources:
     { cloudtrail: { input: [Object], result: [] },
       awsconfig: { input: [Object], result: [] }
     }
   } */
  callback(null, event);
};
