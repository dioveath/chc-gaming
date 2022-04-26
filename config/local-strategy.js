const LocalStrategy = require('passport-local').Strategy;


const localStrategy = new LocalStrategy(
  function(username, password, done){
    return done(null, { username: "Thisisjusttest"});
  }
);


module.exports = localStrategy;
