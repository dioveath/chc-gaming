const Router = require("express").Router;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const config = require("../../config");
const UserAccess = require("../../data-access/user-db");

const authRouter = new Router();


authRouter.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.send({
      status: "fail",
      errorList: ["Please give proper credentials."],
    });

  const user = await UserAccess.findUserBy("email", req.body.email);

  if (user) {
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.send({
        status: "fail",
        errorList: ["User or Password don't match!"],
      });
    }

    const accessToken = issueJwt(user.id, user.roles);
    return res.send({
      status: "success",
      userId: user.id,
      accessToken: accessToken,
    });
  }

  return res.send({
    status: "fail",
    errorList: ["User not found with email, " + req.body.email],
  });
});

authRouter.post("/register", async (req, res) => {
  try {
    const user = await UserAccess.addUser(req.body);
    const accessToken = issueJwt(user.id, user.roles);
    return res.send({
      status: "success",
      userId: user.id,
      accessToken: accessToken,
    });
  } catch (error) {
    return res.send({
      status: "fail",
      errorList: error.message.split(","),
    });
  }
});


function issueJwt(userId, userRoles) {
  const tokenOptions = {
    expiresIn: "1h",
  };
  return jwt.sign(
    {
      sub: userId,
      iss: config.JWT_ISSUER,
      roles: userRoles,
    },
    config.JWT_SECRET,
    tokenOptions
  );
}

module.exports = authRouter;
