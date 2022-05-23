// simple utils for passport.authenticate('jwt') middleware

const passport = require('passport');
// const UserAcces = require('../data-access/user-db/index');

module.exports = function isAuthenticated (req, res, next){
  passport.authenticate('jwt', { session: false }, (err, user, _info) => {
    if(err) {
      console.log(err);
      return next(err);
    }
    
    if(!user){
      return res.status(401).json({
        status: 'fail',
        errorList: [
          "Unauthorized: You're not unauthorized!"
        ]
      });
    }

    // const userData = await UserAccess.findUserById(user.sub);

    req.user = user;
    return next();
  })(req, res, next);
};
