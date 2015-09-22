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

module.exports = function ParameterSettingsControllerModule(pb) {
  function ParameterSettings() {}

  //dependencies
  var util = pb.util;
  
  //inheritance
  util.inherits(ParameterSettings, pb.BaseController);
  
  ParameterSettings.prototype.render = function(cb) {
      var self = this;

      var content = {
          content_type: "text/html",
          code: 200
      };

      var pills = [
      {
          name: 'content_settings',
          title: self.ls.get('TWITTER_SETTINGS'),
          icon: 'chevron-left',
          href: '/admin/plugins/twitter/settings'
      }];
    
      var blankParameter = {
        parameters: [{ 
          type: '',
          value: ''
        }]
      };

      var opts = {
          where: {settings_type: 'api_parameter'}
      };
      var dao  = new pb.DAO();
      dao.q('twitter_plugin_settings', opts, function(err, parameterSettings) {
          if(parameterSettings.length > 0) {
              parameterSettings = parameterSettings[0];
          }
          else {
            parameterSettings = blankParameter;
          }

          var objects = {
              navigation: pb.AdminNavigation.get(self.session, ['plugins', 'manage'], self.ls),
              pills: pills,
              parameterSettings: parameterSettings
          };
          self.ts.registerLocal('angular_script', '');
          self.ts.registerLocal('angular_objects', new pb.TemplateValue(pb.ClientJs.getAngularObjects(objects), false));
          self.ts.load('admin/settings/parameter_settings', function(err, result) {
              cb({content: result});
          });
      });
  };

  ParameterSettings.getRoutes = function(cb) {
      var routes = [
          {
              method: 'get',
              path: '/admin/plugins/twitter/settings/parameter',
              auth_required: true,
              access_level: pb.SecurityService.ACCESS_EDITOR,
              content_type: 'text/html'
          }
      ];
      cb(null, routes);
  };

  return ParameterSettings;
}
