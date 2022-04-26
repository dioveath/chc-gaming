// simple utils for passport.authenticate('jwt') middleware

const passport = require('passport');

module.exports = function isAuthenticated (){
  return passport.authenticate('jwt', { session: false});
};
