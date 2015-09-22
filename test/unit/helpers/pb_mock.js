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

var util = require('util');
module.exports.getMockPB = function () {
  var baseController = require('./base_controller_mock')(),
      templateService = require('./template_service_mock'),
      pluginService = require('./plugin_service_mock')(),
      dao = require('./dao_mock')();
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