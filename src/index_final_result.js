
exports.handler = (event, context, callback) => {
  callback(null, event.final_result);
};
