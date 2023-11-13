const Router = require("express").Router;
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const qs = require('qs');
const { google } = require('googleapis');

const config = require("../../config");
const UserAccess = require('../../data-access/user-db');

const resetRouter = new Router();
const oauth2Client = new google.auth.OAuth2(config.googleClientId, config.googleClientSecret, config.googleCallbackUri);

oauth2Client.setCredentials({
  refresh_token: config.googleRefreshToken
});

resetRouter.get("/:email", async (req, res) => {
  try {
    const user = await UserAccess.findUserBy('email', req.params.email);
    if(!user) throw new Error('There is no such user!');

    const secret = user.password + config.JWT_SECRET;
    const resetToken = jwt.sign(
      {
        sub: user.id,
        iss: config.JWT_ISSUER,
      },
      secret,
      {
        expiresIn: "15m",
      }
    );

    const { token } = await oauth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: 'charichagaming@gmail.com',
        clientId: config.googleClientId,
        clientSecret: config.googleClientSecret,
        refresh_token: config.googleRefreshToken,
      }
    });

    const params = {
      email: req.params.email,
      token: resetToken
    };

    const paramString = qs.stringify(params);
    const info = await transporter.sendMail({
      from: 'Charicha Gaming <team@charichagaming.com.np>',
      to: req.params.email,
      subject: 'Reset Password',
      text: "Reset password link",
      html: `<h1> Reset your password </h1>
               <p>Hi ${user.first_name}, </p>
               <p> Tap the button below to reset your password. If you didn't request a new password you can safely delete this email. </p>
               <a href='https://chcgaming.azurewebsites.net/auth/reset?${paramString}' style="color: white; background-color: rgb(183,27,27); padding: 10px 40px; text-decoration: none; font-weight: semi-bold;"> RESET PASSWORD </a>
               <p> Thank you for being with us! </p>
               <p> Charicha Gaming Team </p>
               <a href='https://chcgaming.azurewebsites.net'> Charicha Gaming </a> `
    });

    return res.status(200).send({
      status: "success",
      message: `Mail sent successfully to '${req.params.email}' with a reset link!`
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
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
