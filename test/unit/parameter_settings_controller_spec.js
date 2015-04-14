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