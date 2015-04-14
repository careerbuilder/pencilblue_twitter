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
    getParameters(function(parameters) {
      getClientInfo(function(clientInfo) {
        var client = new Twitter(clientInfo);
        client.get('statuses/user_timeline', parameters, function(error, tweets, response){
          if(error) self.reqHandler.serveError(error);
          cb(tweets);
        });
      });
    });
  };
  
  function getClientInfo(cb) {
    var pluginService = new pb.PluginService();
    var clientInfo = {};
    pluginService.getSettings('twitter', function(err, twitterSettings) {
      if (util.isError(err)) {
        self.reqHandler.serveError(err);
      }
      twitterSettings.forEach(function(setting) {
        clientInfo[setting.name] = setting.value;
      });
      cb(clientInfo);
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
        self.reqHandler.serveError(err);
      }
      if(settings.length > 0) {
        settings = settings[0];
        settings.parameters.forEach(function(parameter) {
          parameters[parameter.type] = parameter.value;
        });
      }
      cb(parameters);
    });
  }

  return TwitterService;
};
