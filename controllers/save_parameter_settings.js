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

module.exports = function SaveParameterSettingsControllerModule(pb) {
  var util = pb.util;

  function SaveParameterSettings() {}

  //inheritance
  util.inherits(SaveParameterSettings, pb.BaseController);

  SaveParameterSettings.prototype.render = function(cb) {
    var self = this;
    self.getJSONPostParams(function(err, post) {
      delete post._id;

      var opts = {
          where: {settings_type: 'api_parameter'}
      };
      var dao = new pb.DAO();
      dao.q('twitter_plugin_settings', opts, function(err, parameterSettings) {
        if (util.isError(err)) {
          return self.reqHandler.serveError(err);
        }
        if(parameterSettings.length > 0) {
          parameterSettings = parameterSettings[0];
          pb.DocumentCreator.update(post, parameterSettings);
        }
        else {
          parameterSettings = pb.DocumentCreator.create('twitter_plugin_settings', post);
          parameterSettings.settings_type = 'api_parameter';
        }

        dao.save(parameterSettings, function(err, result) {
          if(util.isError(err))  {
            cb({
              code: 500,
              content: pb.BaseController.apiResponse(pb.BaseController.API_FAILURE, self.ls.get('ERROR_SAVING'), result)
            });
            return;
          }

          cb({content: pb.BaseController.apiResponse(pb.BaseController.API_SUCCESS, self.ls.get('TWITTER_SETTINGS') + ' ' + self.ls.get('SAVED'))});
        });
      });
    });
  };

  SaveParameterSettings.prototype.getSanitizationRules = function() {
    return {
      page_layout: pb.BaseController.getContentSanitizationRules()
    };
  };

  SaveParameterSettings.getRoutes = function(cb) {
    var routes = [
      {
        method: 'post',
        path: '/actions/admin/plugins/settings/twitter/parameter',
        auth_required: true,
        access_level: pb.SecurityService.ACCESS_EDITOR,
        content_type: 'text/html'
      }
    ];
    cb(null, routes);
  };

  return SaveParameterSettings;
}
