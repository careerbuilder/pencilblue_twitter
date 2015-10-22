var moment = require('moment');
moment().format();

module.exports = function TwitterRenderingServiceModule(pb) {

  function TwitterRenderingService(options) {
    if (options) {
      this.site = options.site || pb.SiteService.GLOBAL_SITE;
    } else {
      this.site = pb.SiteService.GLOBAL_SITE;
    }
  }

  TwitterRenderingService.init = function (cb) {
    pb.log.debug("TwitterRenderingService: Initialized");
    cb(null, true);
  };

  TwitterRenderingService.getName = function () {
    return "twitterRenderingService";
  };

  TwitterRenderingService.prototype.render = function (cb) {
    var self = this;
    getTweets(self, function (err, tweets) {
      var options = {ls: new pb.Localization(), site: self.site};
      if (err || !tweets || tweets.length <= 0) {
        if (err) {
          pb.log.error("Twitter Service Error: " + err.stack);
        }
        registerTweetLocals(null, options, cb);
      }
      else {
        registerTweetLocals(tweets[0], options, cb);
      }
    });
  };

  function getTimeFromNow(date) {
    return moment(date, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').fromNow();
  }

  function getTweets(self, cb) {
    var TwitterService = pb.PluginService.getService('twitterService', 'pencilblue_twitter', self.site);
    var twitterService = new TwitterService({site: self.site});
    twitterService.getTweets(cb);
  }

  function registerTweetLocals(tweet, options, cb) {
    var url = 'http://twitter.com/',
      jts = new pb.TemplateService(options);
    jts.reprocess = false;
    jts.registerLocal('tweet_text', tweet ? tweet.text : options.ls.get('TWITTER_UNAVAILABLE'));
    jts.registerLocal('tweet_url', tweet ? url + tweet.user.screen_name : '');
    jts.registerLocal('tweet_posted', tweet ? getTimeFromNow(tweet.created_at) : '');
    jts.load('elements/twitter', cb);
  }

  return TwitterRenderingService;
};