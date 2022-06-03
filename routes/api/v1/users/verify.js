const Router = require("express").Router;
const twilio = require("twilio");
const config = require("../../../../config");
const UserAccess = require('../../../../data-access/user-db/index');

const verifyRouter = new Router();

const twilioClient = new twilio(
  config.TWILIO_ACCOUNT_SID,
  config.TWILIO_AUTH_TOKEN
);

verifyRouter.post("/request-verify", async (req, res) => {
  try {
    const { phone_number, phone_verified } = await UserAccess.findUserById(req.user.sub);
    if(phone_verified) throw new Error("Already verified!");
    const verification = await twilioClient.verify
      .services(config.TWILIO_VERIFICATION_SID)
      .verifications.create({
        to: "+977" + phone_number,
        channel: "sms",
      });

    const { sid, to, channel, status: verification_status } = verification;

    return res.json({
      status: "success",
      verification_status,
      sid,
      to,
      channel,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "fail",
      errorList: [
        e.message,
      ]
    });
  }
});

verifyRouter.post("/verify", async (req, res) => {

  try {
    const { verify_code } = req.body;
    const { phone_number, phone_verified } = await UserAccess.findUserById(req.user.sub);    
    if(phone_verified) throw new Error("Already verified!");
    let verificationResult = await twilioClient.verify
      .services(config.TWILIO_VERIFICATION_SID)
      .verificationChecks.create({
        code: verify_code,
        to: "+977" + phone_number,
      });

    const {
      sid,
      to,
      channel,
      status: verification_status,
    } = verificationResult;

    if (verificationResult.status === "approved") {

      const updatedUser = await UserAccess.updateUser(req.user.sub, {
        phone_verified: true
      });

      return res.status(200).json({
        status: "success",
        verification_status,
        sid,
        to,
        channel,
      });
    } else {
      return res.status(400).json({
        status: "fail",
        user_id: req.user.sub,
        verification_status,
        sid,
        to,
        channel,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "fail",
      errorList: [
        e.message
      ],
    });
  }
});

module.exports = verifyRouter;
