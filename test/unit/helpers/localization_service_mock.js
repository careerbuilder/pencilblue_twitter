module.exports = function Localization() {

  function Localization() {}

  Localization.prototype.get = function (aMessage) {
    return aMessage;
  };
  Localization.best = function(val){
    return false;
  }

  return Localization;
};