
var AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
    var ec2Main = new AWS.EC2({region:'us-east-1'});
    ec2Main.describeRegions({}).promise().then(function(data) {
        var regions = [];
        data.Regions.map(function(region) {
          regions.push(region.RegionName);
        });
        const num = regions.length;
        const body = {
          "region": "",
          "account": event.account
        }
        const input = {
          "path": "/dummy",
          "httpMethod": event.method,
          "headers": {
            "Credentials": JSON.stringify(event.federation.body.Credentials)
          },
          "queryStringParameters": {
            "region": ""
          },
          "body": JSON.stringify(body),
          "requestContext": {
            "authorizer": {
              "refresh_token": "abcd",
              "principalId": "1234"
            }
          }
        }
        callback(null, {regions: regions, num: num, result:[], input: input});
    });
};
