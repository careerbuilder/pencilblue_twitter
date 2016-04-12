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
var SaveParameterSettings = require('../../controllers/save_parameter_settings')(pb);
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

describe('Save Parameter Settings Controller', function () {
  var saveParameterSettings;

  before(function () {
    saveParameterSettings = new SaveParameterSettings();
    sinon.stub(pb.BaseController.prototype, 'getJSONPostParams').yields(null, getValidPostResponse());
    var daoQStub = sinon.stub(pb.DAO.prototype, 'q');
    daoQStub.onCall(0).yields(null, getValidDAOResponse());
    daoQStub.onCall(1).yields(null, []);
    var daoSaveStub = sinon.stub(pb.DAO.prototype, 'save');
    daoSaveStub.yields(null, '');
  });

  it('should be a SaveParameterSettings object', function () {
    expect(saveParameterSettings).to.be.instanceof(SaveParameterSettings);
  });
  
  it('should have sanitization rules', function() {
    var rules = saveParameterSettings.getSanitizationRules();
    expect(rules).to.not.equal(null);
    expect(rules.page_layout).to.not.equal(null);
  });

  it('controller should have routes', function (done) {
    SaveParameterSettings.getRoutes(function(err,routes) {
      expect(err).to.equal(null);
      expect(routes).to.have.length.above(0);
      done();
    });
  });
  it('should have content', function(done) {
    saveParameterSettings.render(function(content) {
      expect(content).to.not.equal(null);
      done();
    });
  });
  
  it('should have content if no previous settings', function(done) {
    saveParameterSettings.render(function(content) {
      expect(content).to.not.equal(null);
      done();
    });
  });

  after(function() {
    pb.BaseController.prototype.getJSONPostParams.restore();
    pb.DAO.prototype.q.restore();
    pb.DAO.prototype.save.restore();
  });
});

describe('Save Parameter Settings Save Error', function () {
  var saveParameterSettings;

  before(function () {
    saveParameterSettings = new SaveParameterSettings();
    sinon.stub(pb.BaseController.prototype, 'getJSONPostParams').yields(null, getValidPostResponse());
    var daoQStub = sinon.stub(pb.DAO.prototype, 'q');
    daoQStub.yields(null, getValidDAOResponse());
    var daoSaveStub = sinon.stub(pb.DAO.prototype, 'save');
    daoSaveStub.yields(new Error(), 'there was an error');
  });
  
  it('should handle error on mongo save error', function(done) {
    saveParameterSettings.render(function(response) {
      expect(response.content).to.not.equal(null);
      expect(response.code).to.equal(500);
      done();
    });
  });
  
  after(function() {
    pb.BaseController.prototype.getJSONPostParams.restore();
    pb.DAO.prototype.q.restore();
    pb.DAO.prototype.save.restore();
  });
});

function getValidPostResponse() {
  return {
    _id: '552b7abff2f49fc022402015', 
    parameters: [ 
      { 
        type: 'screen_name', 
        value: 'WorkAtCB'
      }, 
      { 
        type: 'count', 
        value: 2 
      }
    ], 
    object_type: 'twitter_plugin_settings', 
    settings_type: 'api_parameter', 
    created: '2015-04-13T08:13:51.262Z', 
    last_modified: '2015-04-13T08:13:51.262Z' 
  };
}

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