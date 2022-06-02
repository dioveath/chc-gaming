const axios = require("axios");
const config = require("../config");
const tourneyAccess = require('../data-access/tourney-db/mongo-db/index');

module.exports = async (req, res, next) => {
  const { token, amount } = req.body;

  const options = {
    url: "https://khalti.com/api/v2/payment/verify/",
    method: "POST",
    headers: {
      Authorization: `Key ${config.KHALTI_TEST_SECRET_KEY}`,
    },
    data:  {
      "token": token,
      "amount": amount,
    }
  };

  try {
    const response = await axios.request(options);

    if (!response.data.idx) {
      return res.status(400).json({
        status: "fail",
        errorList: response.data.token // token: ['Invalid token. ']
      });
    }

    const tourney = await tourneyAccess.findTourneyById(req.params.id);
    if(!tourney) 
      return res.status(404).json({
        status: "fail",
        errorList: ["No such tournament!"]
      });

    const { members } = tourney;
    const index = members.findIndex((el) => el.member_id === req.user.sub);

    if(index === -1)
      return res.status(400).json({
        status: "fail",
        errorList: ["Payment Verified but User not registered!",
                    "Contact to nearest Charicha Gaming Center"]
      });

    members[index].fee_paid = true;

    req.body = {
      members
    };

    return next();
  } catch (e) {

    return res.status(400).json({
      status: "fail",
      errorList: [e.message]
    });
  }
};
