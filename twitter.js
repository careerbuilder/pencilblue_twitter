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

  Twitter.onUninstall = function(cb) {
    cb(null, true);
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
