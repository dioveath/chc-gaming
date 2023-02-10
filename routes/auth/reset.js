const Router = require("express").Router;
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const qs = require('qs');

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

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    const params = {
      email: req.params.email,
      token: token
    };
    const paramString = qs.stringify(params);
    const info = await transporter.sendMail({
      from: 'Norval Sipes <norval@charichagaming.com.np>',
      to: req.params.email,
      subject: 'Reset Password',
      text: "Reset password link",
      html: `Thank you for being with us! Here's <a href='http:localhost:3000/auth/reset?${paramString}'> RESET LINK </a>`
    });

    console.info("Preview URL: " + nodemailer.getTestMessageUrl(info));
    
    return res.status(200).send({
      status: "success",
      message: `Mail sent successfully to '${req.params.email}' with a reset link!`
    });
  } catch (e) {
    return res.status(400).send({
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

    return res.status(200).send({
      status: 'success',
      updatedUser
    });

  } catch(e){
    return res.status(400).send({
      status: "fail",
      errorList: [e.message],
    });        
  }

});


module.exports = resetRouter;
