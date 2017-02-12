
var event = {
  "regions":["eu-west-2","eu-west-1","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],
  "num":13,
  "resources":{
    "cloudtrail":{
      "input":{"path":"/cloudtrail","httpMethod":"GET","headers":{"Credentials":"e30="},"queryStringParameters":{"region":"ap-south-1"},"body":{"region":"ap-south-1"},"resType":"json"},
      "result":[{"result":true,"region":"ap-south-1"}],
      "action_result":null
    },
    "awsconfig":{
      "input":{"path":"/awsconfig","httpMethod":"GET","headers":{"Credentials":"e30="},"queryStringParameters":{"region":"ap-south-1"},"body":{"region":"ap-south-1"},"resType":"json"},
      "result":[{"result":true,"region":"ap-south-1"}],
      "action_result":null
    }
  }
};
console.log(JSON.stringify(event))

var i = require('../src/repeated_final_result.js');
var context = {succeed: res => console.log(res), done: res => console.log(res), fail: res => console.log(res)};
i.handler(event, context, function(err, data) {
  if (err)  console.log("failed : " + err);
  else console.log("completed: " + JSON.stringify(data));
});
