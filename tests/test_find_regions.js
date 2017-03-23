
var event = {
  "account": {
    "id": null,
    "created_at": null
  },
  "federation": {
    "roles": [],
    "authorizer_user_guid": null,
    "durationSeconds": 0,
    "credentials": {
      "ResponseMetadata": {
        "RequestId": "fdc76bc9-0e65-11e7-b721-1d937c0a6de3"
      },
      "Credentials": {
        "AccessKeyId": "ASIAIAR6NFOSRF66CNHQ",
        "SecretAccessKey": "31o8TsIqd2mooIrLwWzsnPzgkk3xrCRhkIQbgapp",
        "SessionToken": "FQoDYXdzEHwaDDYHQkUwVcuDQLOhXiLPAd/PH6N4dWgvgTsJUQ+c00iIRz7mFoKRPOiMo1sHcmWM2SrzPUElk04m7paMRbwTP3NouV04WzqjKW6hGE/qjQmj0wWM6YvVdyEEKTxId4VhZtR8jdE4aVcfyh9bip0+EbjeZFa4Q9OkPhfJSQhhA+vchsUzKj0y9xZb1sJdCMsYtGLdQoDx/90T1vjlpgGUh+OWyPk2ZcSfgS41Y17EQ5xXOfgSz1F7MDVH47UpSIGFtCFVstBMZ3tPlXhqvQ+bo8ChHlggdM4i2Lq4sbe+6ijX58XGBQ==",
        "Expiration": "2017-03-21T19:41:27.000Z"
      },
      "AssumedRoleUser": {
        "AssumedRoleId": "AROAIELMZOXXFXSB7IH7M:808331752250",
        "Arn": "arn:aws:sts::808331752250:assumed-role/OrganizationAccountAccessRole/808331752250"
      }
    }
  },
  "cloudtrail": {
    "path": "/cloudtrail",
    "httpMethod": "POST",
    "headers": {
      "Credentials": null
    },
    "queryStringParameters": {
      "region": null
    },
    "body": {
      "region": null
    },
    "result": null
  },
  "awsconfig": {
    "path": "/awsconfig",
    "httpMethod": "POST",
    "headers": {
      "Credentials": null
    },
    "queryStringParameters": {
      "region": null
    },
    "body": {
      "region": null
    },
    "result": null
  },
  "health": {
  },
  "configrules": {
  }
}
console.log(JSON.stringify(event))

var i = require('../src/index_find_regions.js');
var context = {succeed: res => console.log(res), done: res => console.log(res), fail: res => console.log(res)};
i.handler(event, context, function(err, data) {
  if (err)  console.log("failed : " + err);
  //else console.log("completed: " + JSON.stringify(data));
  else console.log(data);
});
