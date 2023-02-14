const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;

chai.use(chaiAsPromised);

const { makeArena } = require("./index");

describe("makeArena", () => {
  it("test makeArena makes a valid arena", (done) => {
    const validArenaInfoPayload = {
      name: "Charicha Gaming",
      handle: "charichgaming"
    };

    makeArena(validArenaInfoPayload).then(result => {
      console.log(result);
      expect(result).to.have.keys([
        "name",
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
