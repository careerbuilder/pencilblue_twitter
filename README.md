# PencilBlue Twitter Plugin
[![Code Climate](https://codeclimate.com/github/silverelizard/pencilblue_twitter/badges/gpa.svg)](https://codeclimate.com/github/silverelizard/pencilblue_twitter)

Twitter widget for PencilBlue CMS. Uses the Twitter RESTful API endpoint `/get/statuses/user_timeline`. Documentation for this endpoint can be found in  [Twitter's Developer Documentation](https://dev.twitter.com/rest/reference/get/statuses/user_timeline).

In order to use the plugin you must have a Twitter account and setup an application. The plugin settings require `consumer_key`, `consumer_secret`, `access_token_key`, and `access_token_secret` from an app. There is also a fully customizable settings page for all of the parameters defined for the api endpoint. Either `user_id` or `screen_name` is required for the API to function.

The main use case for the plugin is setting up the parameters and then calling the TwitterService in a template in order to gain access to the tweet data for display. For example, the following code snipper checks if the plugin is installed and then accesses the service:

```JavaScript
if(pb.PluginService.isActivePlugin('twitter')) { //checks if the twitter plugin is installed
  var TwitterService = pb.PluginService.getService('twitterService', 'twitter'); //gets the twitter service from the plugin
  var twitterService = new TwitterService(); //creates a new instance of the twitter service
  twitterService.getTweets(function(tweets) { //calls the getTweets method from the twitter service with a callback
    pb.log.info(tweets); //logs tweets from service to console
  });
}
```
