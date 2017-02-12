
var event = {
  "regions":["ap-south-1","eu-west-2","eu-west-1","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],
  "num":14,
  "resources":{
    "cloudtrail":{
      "input":{"path":"/cloudtrail","httpMethod":"GET","headers":{"Credentials":"e30="},"queryStringParameters":{"region":""},"body":{"region":""},"resType":"json"},
      "result":[]
    },
    "awsconfig":{
      "input":{"path":"/awsconfig","httpMethod":"GET","headers":{"Credentials":"e30="},"queryStringParameters":{"region":""},"body":{"region":""},"resType":"json"},
      "result":[]
    }
  }
};
console.log(JSON.stringify(event))

var i = require('../src/repeated_choose_region.js');
var context = {succeed: res => console.log(res), done: res => console.log(res), fail: res => console.log(res)};
i.handler(event, context, function(err, data) {
  if (err)  console.log("failed : " + err);
  else console.log("completed: " + JSON.stringify(data));
});
