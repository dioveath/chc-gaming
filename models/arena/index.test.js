const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;

chai.use(chaiAsPromised);

const { makeArena } = require("./index");

describe("makeArena", () => {
  it("test makeArena makes a valid arena", (done) => {
    const validArenaInfoPayload = {
      name: "Charicha Gaming",
      handle: "charichgaming",
      owner: "63f4fea2bce1c84fa0b86111"
    };

    makeArena(validArenaInfoPayload).then(result => {
      expect(result).to.have.keys([
        "name",
        "owner",
        "handle",
        "category",
        "appearance",
        "about",
        "subscriptions",
        "billing_details",
        "tournaments",
        "leaderboards",
        "posts",
        "members",
        "roles",
        "bans",
        "followers",
        "following",
        "verified",        
      ]);

      done();
    }).catch(err => {
      console.log(err.value);
      console.error(err.details);
      done(err);
    });

  });
});
