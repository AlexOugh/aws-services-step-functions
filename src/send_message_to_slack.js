'use strict';

const url = require('url');
const https = require('https');

function buildMessage(params) {
  var message = {
    "channel": process.env.channel,
    "icon_emoji": ":+1:",
    "text": "New Account Alert!",
    "attachments": [
        {
            "text": "A new AWS account is successfully created and initially setup.",
            "color": "#3AA3E3",
            "fields": [
              {
                  "title": "Account Id",
                  "value": params.account.id,
                  "short": true
              },
              {
                  "title": "Account Name",
                  "value": params.account.name,
                  "short": true
              },
              {
                  "title": "AWSConfig",
                  "value": "Enabled",
                  "short": true
              },
              {
                  "title": "CloudTrail",
                  "value": "Enabled",
                  "short": true
              },
              {
                  "title": "Billing Alert",
                  "value": "Enabled",
                  "short": true
              },
              {
                  "title": "Alarm Alert",
                  "value": "Enabled",
                  "short": true
              }
            ],
            "author_name": "SGAS CTO Team",
            "footer": "Created By Sungard Availability Services",
            "footer_icon": "https://raw.githubusercontent.com/SungardAS/aws-services-lib/master/docs/images/logo.png",
            "ts": (new Date(params.account.createdAt)).getTime()

        }
    ]
  };
  return message;
}

function postMessage(hookUrl, message, callback) {
  const body = JSON.stringify(message);
  const options = url.parse(hookUrl);
  options.method = 'POST';
  options.headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  };
  const postReq = https.request(options, (res) => {
    const chunks = [];
    res.setEncoding('utf8');
    res.on('data', (chunk) => chunks.push(chunk));
    res.on('end', () => {
      if (callback) {
        callback({
          body: chunks.join(''),
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
        });
      }
    });
    return res;
  });
  postReq.write(body);
  postReq.end();
}

exports.handler = (event, context, callback) => {
  var output = JSON.parse(event.output);
  let hookUrl = `https://${process.env.hookUrl}`;
  var slackMessage = buildMessage(output);
  postMessage(hookUrl, slackMessage, (response) => {
    if (response.statusCode < 400) {
      console.info('Message posted successfully');
      callback(null);
    } else if (response.statusCode < 500) {
      console.error(`Error posting message to Slack API: ${response.statusCode} - ${response.statusMessage}`);
      callback(null);  // Don't retry because the error is due to a problem with the request
    } else {
      // Let Lambda retry
      callback(`Server error when processing message: ${response.statusCode} - ${response.statusMessage}`);
    }
  });
};
