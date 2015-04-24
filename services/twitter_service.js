var Twitter = require('twitter');
module.exports = function TwitterServiceModule(pb) {
  var util = pb.util;
  function TwitterService(){}

  TwitterService.init = function(cb){
    pb.log.debug("TwitterService: Initialized");
    cb(null, true);
  };

  TwitterService.getName = function(){
    return "twitterService";
  };

  TwitterService.prototype.getTweets = function(cb){
    getParameters(function(paramError, parameters) {
      if (util.isError(paramError)) {
        cb(paramError, []);
      }
      else {
        getClientInfo(function(clientError, clientInfo) {
          if (util.isError(clientError)) { cb(clientError, []); }
          else { callTwitter(clientInfo, parameters, cb); }
        });
      }
    });
  };
  
  function getClientInfo(cb) {
    var pluginService = new pb.PluginService();
    pluginService.getSettingsKV('twitter', function(err, twitterSettings) {
      if (util.isError(err)) {
        cb(err, null);
      }
      if(twitterSettings.request_timeout_in_milliseconds) {
        twitterSettings.request_options = {
          "timeout": parseInt(twitterSettings.request_timeout_in_milliseconds)
        };
        delete twitterSettings.request_timeout_in_milliseconds;
      }
      cb(null, twitterSettings);
    });
  }
  
  function getParameters(cb) {
    var parameters = {};
    var dao = new pb.DAO();
    var opts = {
      where: {settings_type: 'api_parameter'}
    };
    dao.q('twitter_plugin_settings', opts, function(err, settings) {
      if (util.isError(err)) {
        cb(err, null);
      }
      if(settings.length > 0) {
        settings = settings[0];
        settings.parameters.forEach(function(parameter) {
          parameters[parameter.type] = parameter.value;
        });
      }
      cb(null, parameters);
    });
  }

  function callTwitter(clientInfo, parameters, cb) {
    var client = new Twitter(clientInfo);
    client.get('statuses/user_timeline', parameters, function (error, tweets, response) {
      if (util.isError(error)) cb(error, []);
      else cb(null, tweets);
    });
  }

  return TwitterService;
};
