/*
 Copyright (C) 2015  Careerbuilder, LLC

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
		queryService.delete({site: site}, 'twitter_plugin_settings', function (err) {
			if (pb.util.isError(err)) {
				pb.log.error("Error: Failed to remove twitter plugin settings for site " + site + ". ERR[" + err.stack + "]");
				return cb(null, true);
			}
			pb.log.silly("Successfully deleted twitter plugin settings for site " + site);
			pb.log.info("Twitter Plugin Uninstalled");
			cb(null, true);
		});
	};

  Twitter.onStartup = function(cb) {
    pb.AdminSubnavService.registerFor('plugin_settings', function(navKey, localization, plugin) {
      if(plugin.uid === 'twitter') {
        return [
          {
            name: 'parameter_settings',
            title: 'Parameter settings',
            icon: 'twitter',
            href: '/admin/plugins/twitter/settings/parameter'
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
