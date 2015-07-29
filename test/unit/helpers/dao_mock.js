module.exports = function DAOModule() {
  function DAO(){}
  
  DAO.prototype.q = function(collection, options, cb) {
    cb(null, '');
  };
  
  DAO.prototype.save = function(object, cb) {
    cb(null, '');
  };
  
  return DAO;
};
