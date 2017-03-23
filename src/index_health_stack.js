
var fs = require('fs');
var stack_builder = new (require('aws-services-lib/stack_builder'))();

const createResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: body
  }
};

exports.handler = function (event, context) {

  console.log(JSON.stringify(event));

  // create cloudformation and codepipeline roles first if not exist
  createRole(event.cloudformationLambdaExecutionRole, function(err, data) {
    if (err) {
      console.log("Failed to created a role, " + event.cloudformationLambdaExecutionRole);
      context.fail(err, null);
    }
    else {
      createRole(event.codePipelineServiceRole, function(err, data) {
        if (err) {
          console.log("Failed to created a role, " + event.codePipelineServiceRole);
          context.fail(err, null);
        }
        else {
          // set the param values
          event.params.templateStr = event.templateStr;
          event.params.parameters.forEach(function(param) {
            if (param.ParameterKey == "CloudformationLambdaExecutionRoleArn") {
              param.ParameterValue = "arn:aws:iam::" + event.accountId + ":role/cloudformation-lambda-execution-role"
            }
            else if (param.ParameterKey == "CodePipelineServiceRoleArn") {
              param.ParameterValue = "arn:aws:iam::" + event.accountId + ":role/AWS-CodePipeline-Service"
            }
            else if (param.ParameterKey == "ParameterOverrides") {
              var paramValue = {
                "HealthLogGroupName": "/SungardAS/Alerts/Health",
                "SubscriptionFilterDestinationArn": "arn:aws:logs:" + process.env.AWS_DEFAULT_REGION + ":" + event.accountId + ":destination:" + event.destinationName
              };
              param.ParameterValue = JSON.stringify(paramValue);
            }
            else if (param.ParameterKey == "GitHubPersonalAccessToken") {
              param.ParameterValue = event.gitHubPersonalAccessToken;
            }
          });

          // now stack operation
          event.params.region = process.env.AWS_DEFAULT_REGION;
          stack_builder[event.action](event.params, function(err, data) {
            if(err) {
              if (event.action == 'launch') {
                console.log("Error occurred during " + event.action + " : " + err);
                context.fail(err, null);
              }
              else if (event.action == 'drop') {
                console.log("stack was already removed");
                context.fail(err, null);
              }
            }
            else {
              console.log(data);
              console.log("completed to " + event.action + " stack");
              context.done(null, createResponse(200, data));
            }
          });
        }
      });
    }
  });
}

function createRole(roleName, callback) {

  var aws_role = new (require('aws-services-lib/aws/role.js'))();

  var trustDocument = fs.readFileSync(__dirname + '/json/' + roleName + '_trust.json', {encoding:'utf8'});
  console.log(trustDocument);

  var policyDocument = fs.readFileSync(__dirname + '/json/' + roleName + '_policy.json', {encoding:'utf8'});
  console.log(policyDocument);

  var input = {
    region: process.env.AWS_DEFAULT_REGION,
    roleName : roleName,
    assumeRolePolicyDocument: trustDocument,
    inlinePolicyName : "InlinePolicy",
    inlinePolicyDocument: policyDocument
  };

  function succeeded(input) { callback(null, true); }
  function failed(input) { callback(null, false); }
  function errored(err) { callback(err, null); }

  var flows = [
    {func:aws_role.findRole, success:succeeded, failure:aws_role.createRole, error:errored},
    {func:aws_role.createRole, success:aws_role.createInlinePolicy, failure:failed, error:errored},
    {func:aws_role.createInlinePolicy, success:aws_role.wait, failure:failed, error:errored},
    {func:aws_role.wait, success:succeeded, failure:failed, error:errored}
  ];
  aws_role.flows = flows;

  flows[0].func(input);
};
