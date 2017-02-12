
var AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
  var ec2Main = new AWS.EC2({region:'us-east-1'});
  ec2Main.describeRegions({}).promise().then(function(data) {
    var regions = [];
    data.Regions.map(function(region) {
      regions.push(region.RegionName);
    });
    const num = regions.length;
    var input = {
      "path": "",
      "httpMethod": event.method,
      "headers": {
        "Credentials": new Buffer(JSON.stringify(event.federation.body.Credentials)).toString('base64')
      },
      "queryStringParameters": {
        "region": ""
      },
      "body": {
        "region": ""
      },
      "resType": "json"
    };
    var cloudtrailInput = JSON.parse(JSON.stringify(input));
    cloudtrailInput.path = "/cloudtrail";
    var awsconfigInput = JSON.parse(JSON.stringify(input));
    awsconfigInput.path = "/awsconfig";
    var ret = {
      regions: regions,
      num: num,
      resources: {
        cloudtrail: {input: cloudtrailInput, result: []},
        awsconfig: {input: awsconfigInput, result: []},
      }
    };
    callback(null, ret);
  });
};
