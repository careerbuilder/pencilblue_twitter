module.exports = function ParameterSettingsControllerModule(pb) {
  function ParameterSettings() {}


  //dependencies
  var util = pb.util;
  
  //inheritance
  util.inherits(ParameterSettings, pb.BaseController);
  
  ParameterSettings.prototype.render = function(cb) {
      var self = this;
      self.siteQueryService = new pb.SiteQueryService({site:self.site, onlyThisSite:true});

      var pills = [
      {
          name: 'content_settings',
          title: self.ls.get('TWITTER_SETTINGS'),
          icon: 'chevron-left',
          href: '/admin/plugins/pencilblue_twitter/settings'
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
      self.siteQueryService.q('twitter_plugin_settings', opts, function(err, parameterSettings) {
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
          self.ts.load('admin/settings/twitter_parameter_settings', function(err, result) {
              cb({content: result});
          });
      });
  };

  ParameterSettings.getRoutes = function(cb) {
      var routes = [
          {
              method: 'get',
              path: '/admin/plugins/pencilblue_twitter/settings/parameter',
              auth_required: true,
              access_level: pb.SecurityService.ACCESS_EDITOR,
              content_type: 'text/html'
          }
      ];
      cb(null, routes);
  };

  return ParameterSettings;
};
