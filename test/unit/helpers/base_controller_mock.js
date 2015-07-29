module.exports = function BaseControllerModule() {
  var Site_Query_Service_Mock = require('./site_query_service_mock');

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

  BaseController.prototype.siteQueryService = Site_Query_Service_Mock;

  BaseController.apiResponse = function(cd, msg, dta) {
    var response = {code: cd, message: msg, data: dta};
    return JSON.stringify(response);
  };

  return BaseController;
}