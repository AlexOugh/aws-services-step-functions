
var AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
  var stepfunctions = new AWS.StepFunctions({region: process.env.AWS_DEFAULT_REGION});
  var params = {
    executionArn: event.executionArn
  };
  stepfunctions.describeExecution(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    }
    else {
      console.log(data);
      // {"executionArn":"arn:aws:states:us-east-1:1111:execution:machine_name:12345678-1234-1234-1234-123456789012",
      //  "stateMachineArn":"arn:aws:states:us-east-1:1111:stateMachine:machine_name",
      //  "name":"12345678-1234-1234-1234-123456789012",
      //  "status":"SUCCEEDED",
      //  "startDate":"2017-02-12T02:12:07.464Z",
      //  "stopDate":"2017-02-12T02:12:45.911Z",
      //  "input":"{\"federation\":{\"roles\":[{\"roleArn\":\"arn:aws:iam::089476....."}",
      //  "output":"{\"results\":{\"cloudtrail\":[{\"result\":true,\"....-west-2\"}]}}"}
      callback(null, data);
    }
  });
};
