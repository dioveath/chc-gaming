const jwtStrategy = require('./jwt-strategy');
const localStrategy = require('./local-strategy');


module.exports = (passport) => {
  
  passport.serializeUser(function(user, done){
    done(null, user);
  });

  passport.deserializeUser(function(user, done){
    done(null, user);
  });

  passport.use(jwtStrategy);

};
