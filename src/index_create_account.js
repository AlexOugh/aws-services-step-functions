
exports.handler = (event, context, callback) => {
  //event.account.id = Math.random().toString().replace('0.', '').replace('.', '');
  event.account.id = '808331752250';
  event.account.created_at = new Date().toString();
  var roles = event.billing_master.roles;
  roles.push({"roleArn": "arn:aws:iam::" + event.account.id + ":role/OrganizationAccountAccessRole"});
  event.federation.roles = roles;
  event.federation.authorizer_user_guid = "808331752250";
  callback(null, event);
};
