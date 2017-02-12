
var AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
  var stepfunctions = new AWS.StepFunctions({region: process.env.AWS_DEFAULT_REGION});
  var params = {
    stateMachineArn: event.stateMachineArn,
    input: event.input,
    //name: 'STRING_VALUE'
  };
  stepfunctions.startExecution(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    }
    else {
      console.log(data);
      // {"executionArn":"arn:aws:states:us-east-1:1234:execution:machine_name:12345678-1234-1234-1234-123456789012",
      //  "startDate":"2017-02-12T02:12:07.464Z"}
      callback(null, data);
    }
  });
};
