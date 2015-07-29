var util = require('util');
module.exports.getMockPB = function () {
  var baseController = require('./base_controller_mock')(),
      templateService = require('./template_service_mock'),
      pluginService = require('./plugin_service_mock')(),
      dao = require('./dao_mock')(),
      siteQueryService = require('./site_query_service_mock')();
  var pb = {
    AdminNavigation: {
      get: function(session, nav, ls) {
        return '';
      }
    },
    BaseController: baseController,
    ClientJs: {
      getAngularObjects: function(objects) {
        return JSON.stringify(objects);
      }
    },
    DAO: dao,
    DocumentCreator: {
      create: function(post) {
        var arr = [];
        arr.push(post);
        return arr;
      },
      update: function() {}
    },
    log: {
      info: function () {},
      error: function () {},
      debug: function() {}
    },
    PluginService: pluginService,
    SecurityService: {
      ACCESS_EDITOR: "ACCESS_EDITOR"
    },
    SiteQueryService: siteQueryService,
    TemplateService : templateService,
    util : util
  };
  pb.TemplateValue = function (content, isEscaped) {
    var contentList;
    if (typeof content === 'string') { contentList = content.split(','); } else { contentList = content; }

    return {
      collection : contentList,
      htmlEscaped : isEscaped
    };
  };
  pb.log.info = function(i) { return true; };
  return pb;
};