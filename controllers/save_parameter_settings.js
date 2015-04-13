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
