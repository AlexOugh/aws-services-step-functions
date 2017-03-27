
var AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
  var creds = new AWS.Credentials({
    accessKeyId: event.credentials.Credentials.AccessKeyId,
    secretAccessKey: event.credentials.Credentials.SecretAccessKey,
    sessionToken: event.credentials.Credentials.SessionToken
  });
  event.health.credentials = creds;

  var credentials = {
    "AccessKeyId": event.credentials.Credentials.AccessKeyId,
    "SecretAccessKey": event.credentials.Credentials.SecretAccessKey,
    "SessionToken": event.credentials.Credentials.SessionToken
  }
  credentials = new Buffer(JSON.stringify(credentials)).toString('base64');
  event.cloudtrail.headers.Credentials = credentials;
  event.awsconfig.headers.Credentials = credentials;

  callback(null, event);
};
