const Router = require('express').Router;
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./index');

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = config.JWT_SECRET;
opts.issuer = config.JWT_ISSUER;

const jwtStrategy = new JwtStrategy(opts, function(payload, done) {
  return done(null, payload);
});


module.exports = jwtStrategy;
