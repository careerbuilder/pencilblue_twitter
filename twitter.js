module.exports = function TwitterModule(pb){
  
  function Twitter(){}

  Twitter.onInstall = function(cb) {
    cb(null, true);
  };

	/**
	 * Called when the application is uninstalling this plugin.  The plugin should
	 * make every effort to clean up any plugin-specific DB items or any in function
	 * overrides it makes.
	 *
	 * @param cb A callback that must be called upon completion.  cb(Error, Boolean).
	 * The result should be TRUE on success and FALSE on failure
	 */
	Twitter.onUninstallWithContext = function (context, cb) {
		var site = pb.SiteService.getCurrentSite(context.site);

		var queryService = new pb.SiteQueryService({site: site, onlyThisSite: true});
		pb.log.silly('Preparing to delete twitter plugin settings');
		queryService.delete({site: site}, 'twitter_plugin_settings', function (err, commandResult) {
			if (err || !commandResult) {
				pb.log.error("Error: Failed to remove twitter plugin settings for site " + site);
				return cb(null, true);
			}
			pb.log.silly("Successfully deleted twitter plugin settings for site " + site);
			pb.log.info("Twitter Plugin Uninstalled");
			cb(null, true);
		});
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
