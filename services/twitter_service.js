var Twitter = require('twitter');
module.exports = function TwitterServiceModule(pb) {

  function TwitterService(){}

  TwitterService.init = function(cb){
    pb.log.debug("TwitterService: Initialized");
    cb(null, true);
  };

  TwitterService.getName = function(){
    return "twitterService";
  };

  TwitterService.prototype.getStream = function(cb){
    var client = setupTwitterClient();
    
  };
  
  function setupTwitterClient() {
    var pluginService = new pb.PluginService();
    var clientInfo = {};
    pluginService.getSettings('twitter', function(err, twitterSettings) {
      twitterSettings.forEach(function(setting) {
        clientInfo[setting.name] = setting.value;
      });
    });
    return new Twitter(clientInfo);
  }

  return TwitterService;
};
