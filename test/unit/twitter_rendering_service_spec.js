var pb = require('./helpers/pb_mock').getMockPB();
var TwitterRenderingService = require('../../services/twitter_rendering_service')(pb);
var TwitterService = require('./helpers/twitter_service_mock')();
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

describe('Twitter Rendering Service', function () {
  var twitterRenderingService,
    pluginServiceGetStub,
    twitterServiceStub;

  var sandbox = sinon.sandbox.create();
  before(function () {
    twitterRenderingService = new TwitterRenderingService();
    pluginServiceGetStub = sandbox.stub(pb.PluginService, 'getService').returns(TwitterService);
    twitterServiceStub = sandbox.stub(TwitterService.prototype, 'getTweets');
    twitterServiceStub.onCall(0).yields(null, getValidTwitterResponse());
    twitterServiceStub.onCall(1).yields('this is an error', []);
  });

  it('should be a TwitterRenderingService object', function () {
    expect(twitterRenderingService).to.be.instanceof(TwitterRenderingService);
  });

  it('should have name twitterRenderingService', function () {
    var name = TwitterRenderingService.getName();
    expect(name).to.not.equal(null);
    expect(name).to.equal('twitterRenderingService');
  });

  it('should register site to whatever the options object is if one is provided', function(){
    var siteTest = new TwitterRenderingService({site: 'bravo'});
    expect(siteTest.site).to.equal('bravo');
  });
  it('should be initialized', function (done) {
    TwitterRenderingService.init(function (err, result) {
      expect(err).to.equal(null);
      expect(result).to.not.equal(null);
      expect(result).to.equal(true);
      done();
    });
  });

  it('should render html', function (done) {
    twitterRenderingService.render(function (err, templateValue) {
      expect(err).to.equal(null);
      expect(templateValue).to.not.equal(null);
      expect(templateValue).to.contain('This is a tweet');
      done();
    });
  });

  it('should show service unavailable when errors occur', function (done) {
    twitterRenderingService.render(function (err, templateValue) {
      expect(err).to.equal(null);
      expect(templateValue).to.not.equal(null);
      expect(templateValue).to.contain('TWITTER_UNAVAILABLE');
      done();
    });
  });

  after(function () {
    sandbox.restore();
  });
});

function getValidTwitterResponse() {
  return [
    {
      created_at: "Tue Apr 14 02:42:14 +0000 2015",
      text: "This is a tweet #testing",
      user: {
        screen_name: "ScreenName"
      }
    }
  ];
}