module.exports = function BaseControllerModule() {
  function BaseController(){};

  BaseController.prototype.init = function(props, cb) {
	var self = this;
	cb();
  };

  BaseController.prototype.getPostParams = function(cb) {
	cb(null, null);
  };

  BaseController.prototype.getJSONPostParams = function(cb) {
    cb(null, null);
  };

  BaseController.prototype.ls = {
    get: function(localizationId) {
      return localizationId;
    }
  };
  
  BaseController.prototype.reqHandler = {
    serveError: function(err) {
      return;
    }
  };
  
  BaseController.getContentSanitizationRules = function() {
    return {};
  };
  
  BaseController.apiResponse = function(cd, msg, dta) {
    var response = {code: cd, message: msg, data: dta};
    return JSON.stringify(response);
  };

  return BaseController;
}