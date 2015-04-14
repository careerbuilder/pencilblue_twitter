module.exports = function PluginServiceModule() {
  function PluginService(){};

  PluginService.prototype.getSettings = function(pluginName, cb) {
	cb('settings');
  };

  return PluginService;
}