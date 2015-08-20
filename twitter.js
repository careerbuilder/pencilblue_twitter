module.exports = function TwitterModule(pb){
  
  function Twitter(){}

  Twitter.onInstall = function(cb) {
    cb(null, true);
  };

  Twitter.onUninstall = function(cb) {
    cb(null, true);
  };

  Twitter.onStartup = function(cb) {
    pb.AdminSubnavService.registerFor('plugin_settings', function(navKey, localization, data) {
      if(data.plugin.uid === 'pencilblue_twitter') {
        return [
          {
            name: 'parameter_settings',
            title: 'Parameter settings',
            icon: 'twitter',
            href: '/admin/plugins/pencilblue_twitter/settings/parameter'
          }
        ];
      }
      return [];
    });
    cb(null, true);
  };

  Twitter.onShutdown = function(cb) {
    cb(null, true);
  };

  return Twitter;
};
