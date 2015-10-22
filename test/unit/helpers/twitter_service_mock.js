module.exports = function TwitterServiceModule() {
  function TwitterService(){}
  
  TwitterService.prototype.getTweets = function(cb){
    cb('');
  };

  return TwitterService;
};
