
exports.handler = (event, context, callback) => {
  event.account.id = Math.random().toString().replace('0.', '').replace('.', '');
  event.account.createdAt = new Date().toString();
  callback(null, event);
};
