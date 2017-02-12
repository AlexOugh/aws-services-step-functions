
var event = {
  method: 'GET',
  federation: {
    body: {
      Credentials: {}
    }
  }
};
console.log(JSON.stringify(event))

var i = require('../src/repeated_find_regions.js');
var context = {succeed: res => console.log(res), done: res => console.log(res), fail: res => console.log(res)};
i.handler(event, context, function(err, data) {
  if (err)  console.log("failed : " + err);
  else console.log("completed: " + JSON.stringify(data));
});
