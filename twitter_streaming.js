module.exports = function TwitterStreamingModule(pb){
  
  function TwitterStreaming(){}

  TwitterStreaming.onInstall = function(cb) {
    cb(null, true);
  };

  TwitterStreaming.onUninstall = function(cb) {
    cb(null, true);
  };

  TwitterStreaming.onStartup = function(cb) {
    pb.AdminSubnavService.registerFor('plugin_settings', function(navKey, localization, plugin) {
      if(plugin.uid === 'twitter_streaming') {
        return [
          {
            name: 'parameter_settings',
            title: 'Parameter settings',
            icon: 'twitter',
            href: '/admin/plugins/twitter_streaming/settings/parameter'
          }
        ];
      }
      return [];
    });
    cb(null, true);
  };

  TwitterStreaming.onShutdown = function(cb) {
    cb(null, true);
  };

  return TwitterStreaming;
};
