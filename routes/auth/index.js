const Router = require("express").Router;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const config = require("../../config");
const UserAccess = require("../../data-access/user-db");

const resetRouter = require('./reset');
const authRouter = new Router();

authRouter.use('/reset', resetRouter);

authRouter.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(406).send({
      status: "fail",
      errorList: ["Please give proper credentials."],
    });

  const user = await UserAccess.findUserBy("email", req.body.email);

  if (user) {
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).send({
        status: "fail",
        errorList: ["User or Password don't match!"],
      });
    }
    const accessToken = issueJwt(user.id, user.roles, user.permissions);

    return res.status(200).send({
      status: "success",
      userId: user.id,
      accessToken: accessToken,
    });
  }

  return res.status(404).send({
    status: "fail",
    errorList: ["User not found with email, " + req.body.email],
  });
});

authRouter.post("/register", async (req, res) => {
  try {
    const user = await UserAccess.addUser(req.body);
    const accessToken = issueJwt(user.id, user.roles, user.permissions);
    return res.status(201).send({
      status: "success",
      userId: user.id,
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: "fail",
      errorList: error.message.split(","),
    });
  }
});


function issueJwt(userId, userRoles, userPermissions) {
  const tokenOptions = {
    expiresIn: "24h",
  };
  return jwt.sign(
    {
      sub: userId,
      iss: config.JWT_ISSUER,
      roles: userRoles,
      permissions: userPermissions
    },
    config.JWT_SECRET,
    tokenOptions
  );
}

module.exports = authRouter;
