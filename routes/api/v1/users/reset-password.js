const Router = require("express").Router;
const jwt = require("jsonwebtoken");

const config = require("../../../../config");
const UserAccess = require('../../../../data-access/user-db');

const resetRouter = new Router();

resetRouter.get("/:email", async (req, res) => {
  try {
    const user = await UserAccess.findUserBy('email', req.params.email);
    if(!user) throw new Error('There is no such user!');

    const secret = user.password + config.process.env.JWT_SECRET;
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

resetRouter.get("/:email/confirm", async (req, res) => {
  try {
    const { reset_token, password } = req.body;
    if(!password) throw new Error('Please give proper credentials!');

    const user = UserAccess.findUserById('email', req.body.email);
    const secret = user.password + config.process.env.JWT_SECRET;    

    const data = jwt.verify(reset_token, secret);
    if(data.sub !== user.id) throw new Error('Token didnt match!');

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
