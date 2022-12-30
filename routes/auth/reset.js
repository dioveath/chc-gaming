const Router = require("express").Router;
const jwt = require("jsonwebtoken");

const config = require("../../config");
const UserAccess = require('../../data-access/user-db');

const resetRouter = new Router();

resetRouter.get("/:email", async (req, res) => {
  try {
    const user = await UserAccess.findUserBy('email', req.params.email);
    if(!user) throw new Error('There is no such user!');

    const secret = user.password + config.JWT_SECRET;
    const token = jwt.sign(
      {
        sub: user.id,
        iss: config.JWT_ISSUER,
      },
      secret,
      {
        expiresIn: "15m",
      }
    );

    return res.send({
      status: "success",
      reset_token: token
    });
  } catch (e) {
    return res.send({
      status: "fail",
      errorList: [e.message],
    });    
  }



});

resetRouter.post("/:email", async (req, res) => {
  try {
    const reset_token = req.headers['authorization'].split(' ')[1];
    const user = await UserAccess.findUserBy('email', req.params.email);

    if(!user) throw new Error('No user found with email: ' + req.params.email);

    const secret = user.password + config.JWT_SECRET;    
    const data = jwt.verify(reset_token, secret);

    const { password } = req.body;
    if(!password) throw new Error('Please give proper credentials!');

    const updatedUser = UserAccess.updateUser(user.id, { password });

    return res.send({
      status: 'success',
      updatedUser
    });

  } catch(e){
    return res.send({
      status: "fail",
      errorList: [e.message],
    });        
  }

});


module.exports = resetRouter;
