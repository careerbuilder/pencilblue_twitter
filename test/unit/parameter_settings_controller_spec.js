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

var pb = require('./helpers/pb_mock').getMockPB();
var ParameterSettings = require('../../controllers/parameter_settings')(pb);
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

describe('Parameter Settings Controller', function () {
  var parameterSettings;

  before(function () {
    parameterSettings = new ParameterSettings();
    var daoQStub = sinon.stub(pb.DAO.prototype, 'q');
    daoQStub.onCall(0).yields(null, getValidDAOResponse());
    daoQStub.onCall(1).yields(null, []);
  });

  it('should be a ParameterSettings object', function () {
    expect(parameterSettings).to.be.instanceof(ParameterSettings);
  });

  it('controller should have routes', function (done) {
    ParameterSettings.getRoutes(function(err,routes) {
      expect(err).to.equal(null);
      expect(routes).to.have.length.above(0);
      done();
    });
  });
  
  it('should have content', function(done) {
    parameterSettings.ts = new pb.TemplateService();
    parameterSettings.render(function(content) {
      expect(content).to.not.equal(null);
      done();
    });
  });
  
  it('should have content with blank settings', function(done) {
    parameterSettings.ts = new pb.TemplateService();
    parameterSettings.render(function(content) {
      expect(content).to.not.equal(null);
      done();
    });
  });
});

function getValidDAOResponse() {
  return [
    {
      _id:"552b7abff2f49fc022402015",
      parameters: [
        {
          type:"screen_name",value:"WorkAtCB"
        },    
        {
          type:"count",value:"2"
        }
      ],
      object_type:"twitter_plugin_settings",
      settings_type:"api_parameter",
      created:"2015-04-13T08:13:51.262Z",
      last_modified:"2015-04-13T10:58:09.062Z"
    }
  ];
}