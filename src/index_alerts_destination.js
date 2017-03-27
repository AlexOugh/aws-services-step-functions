
var AWS = require('aws-sdk');
var StackBuilder = require('aws-services-lib/stack_builder');

const createResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: body
  }
};

var result = [];

exports.handler = function (event, context) {

  console.log(JSON.stringify(event));

  var ec2Main = new AWS.EC2({region:'us-east-1'});
  ec2Main.describeRegions({}, function(err, regions) {
    if (err) {
      context.fail(err, null);
    }
    else {
      build(regions.Regions, 0, event, function(err, res) {
        if (err) {
          context.fail(err, null);
        }
        else {
          context.done(null, createResponse(200, res));
        }
      });
    }
  });
}

function build(regions, idx, event, callback) {

  var params = JSON.parse(JSON.stringify(event.params));
  params.region = regions[idx].RegionName;

  findDestinationPolicy(params.region, event.destinationName, function(err, policy) {
    if (err) {
      console.log(err);
      return callback(null, err);
    }
    else {
      // add new account to the policyDocument
      var accountListStr = "";
      if (policy) {
        var policyDocument = JSON.parse(policy);
        if (policyDocument.Statement[0].Principal.AWS.indexOf(event.accountToAdd) >= 0) {
          accountListStr = policyDocument.Statement[0].Principal.AWS.join();
        }
        else {
          accountListStr = policyDocument.Statement[0].Principal.AWS.join() + "," + event.accountToAdd;
        }
      }
      else {
        accountListStr = event.accountToAdd;
      }
      params.parameters.forEach(function(param) {
        if (param.ParameterKey == "Accounts") {
          param.ParameterValue = accountListStr;
        }
      });
      console.log(params);

      // now stack operation
      var stack_builder = new StackBuilder();
      stack_builder[event.action](params, function(err, status) {
        if(err) {
          if (event.action == 'launch') {
            console.log("Error occurred during " + event.action + " in region, " + params.region + " : " + err);
            result.push({'region':params.region, 'result':err});
            return callback(null, result);
          }
          else if (event.action == 'drop') {
            console.log("stack was already removed in region, " + params.region);
            result.push({'region':params.region, 'result':err});
            return callback(null, result);
          }
        }
        else {
          console.log("completed to " + event.action + " stack in region, " + params.region + " : " + status);
          result.push({'region':params.region, 'result':status});
          if (++idx >= regions.length) {
            return callback(null, result);
          }
          else {
            build(regions, idx, event, callback);
          }
        }
      });
    }
  });
}

function findDestinationPolicy(region, destinationName, callback) {
  var cloudwatchlogs = new AWS.CloudWatchLogs({region: region});
  params = {
    DestinationNamePrefix: destinationName
  };
  cloudwatchlogs.describeDestinations(params, function(err, data) {
    if (err) {
      console.log("failed to find destination in region, " + region + " : " + err);
      callback(err, null);
    }
    else {
      console.log(data);
      if (data && data.destinations.length > 0) {
        console.log("found destination in region, " + region + " : " + data);
        if (data.destinations[0].accessPolicy) {
          callback(null, data.destinations[0].accessPolicy);
        }
        else {
          callback(null, null);
        }
      }
      else {
        console.log("no destination found in region, " + region);
        callback(null, null);
      }
    }
  });
}
