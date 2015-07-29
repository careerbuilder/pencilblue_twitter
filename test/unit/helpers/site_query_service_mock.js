/**
 * Created by kbechtel on 7/29/15.
 */
module.exports = function Site_Query_Service_Module() {
  function SQS(){}

  SQS.prototype.q = function(collection, options, cb) {
    cb(null, '');
  };

  SQS.prototype.save = function(object, cb) {
    cb(null, '');
  };

  return SQS;
};