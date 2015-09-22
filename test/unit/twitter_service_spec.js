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

var Twitter = require('twitter');
var pb = require('./helpers/pb_mock').getMockPB();
var TwitterService = require('../../services/twitter_service')(pb);
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

describe('Twitter Service', function () {
  var twitterService,
      daoQStub,
      pluginSettingStub,
      twitterStub;
  
  before(function () {
    twitterService = new TwitterService();
    daoQStub = sinon.stub(pb.DAO.prototype, 'q');
    daoQStub.onCall(0).yields(null, getValidDAOResponse());
    pluginSettingStub = sinon.stub(pb.PluginService.prototype, 'getSettingsKV');
    pluginSettingStub.onCall(0).yields(null, getValidSettingResponse());
    twitterStub = sinon.stub(Twitter.prototype, 'get');
    twitterStub.onCall(0).yields(null, 'tweets', 'response');
  });

  it('should be a TwitterService object', function () {
    expect(twitterService).to.be.instanceof(TwitterService);
  });
  
  it('should have name', function() {
    var name = TwitterService.getName();
    expect(name).to.equal('twitterService');
  });
  
  it('should be initialized', function(done) {
    TwitterService.init(function(err,result) {
      expect(result).to.equal(true);
      expect(err).to.equal(null);
      done();
    });
  });
  
  it('should get tweets', function(done) {
    twitterService.getTweets(function(err, tweets) {
      expect(err).to.equal(null);
      expect(tweets).to.not.equal(null);
      expect(tweets).to.equal('tweets');
      done();
    });
  });
  
  after(function() {
    daoQStub.restore();
    pluginSettingStub.restore();
    twitterStub.restore();
  });
});

function getValidDAOResponse() {
  return [
    {
      _id:"552b7abff2f49fc022402015",
      parameters: [
        {
          type:"screen_name",
          value:"WorkAtCB"
        },
        {
          type:"count",
          value:"1"
        }
      ],
      object_type:"twitter_plugin_settings",
      settings_type:"api_parameter",
      created:"2015-04-13T08:13:51.262Z",
      last_modified:"2015-04-13T11:40:01.004Z"
    }
  ];
}

function getValidSettingResponse() {
  return {
    consumer_key:"consumer_key_value",
    consumer_secret:"consumer_secret_value",
    access_token_key:"access_token_key_value",
    access_token_secret:"access_token_secret_value"
  };
}