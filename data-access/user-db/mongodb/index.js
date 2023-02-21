// uses mongoose implementation of findUser, listUsers, dropAll, etc.
// Gateway  -- Implementation
// Data-Access and Use-Cases as well

const User = require('../../../db/mongodb/models/user');
const serialize = require('./serializer');
const makeUser = require('../../../models/user/index').makeUser;
const makeUpdateUser = require('../../../models/user/index').makeUpdateUser;
const errorFormatter = require('./errorFormatter');


function listUsers(){
  return User.find({}).then(serialize).catch(errorFormatter);
}

function findUserBy(prop, val){
  if(prop === 'id') prop = '_id';
  return User.find({[prop]: val}).then(res => serialize(res[0])).catch(errorFormatter);
}

function findUserById(id){
  return User.findById(id).then(serialize).catch(errorFormatter);
}

async function addUser(userInfo){
  // defaults
  userInfo.roles = ['628a15b4697db52918b69f1c']; // gamer role
  userInfo.permissions = ['read:users:all', 'update:users:self', 'read:clips:all', 'read:tourneys:all'];
  userInfo.profile_link = '';
  userInfo.cover_link = '';
  userInfo.exp_points = 0;
  userInfo.achievements = [];
  userInfo.trophies = [];
  userInfo.followers = [];
  userInfo.following = [];
  userInfo.social_links = [];

  var user = await makeUser(userInfo);

  var newUser = {
    first_name: user.getFirstName(),
    last_name: user.getLastName(),
    gaming_name: user.getGamingName(),
    password: user.getPassword(),
    email: user.getEmail(),
    phone_number: user.getPhoneNumber(),
    address: user.getAddress(),
    dob: user.getDOB(),
    roles: user.getRoles(),
    permissions: user.getPermissions(),
    phone_verified: false,
    email_verified: false,
    profile_link: user.getProfileLink(),
    cover_link: user.getCoverLink(),
    social_links: user.getSocialLinks(),
    exp_points: user.getExpPoints(),
    achievements: user.getAchievements(),
    trophies: user.getTrophies(),
    followers: user.getFollowers(),
    following: user.getFollowing()
  };

  return User.create(newUser).then(serialize).catch(errorFormatter);
}


async function updateUser(id, updateUserInfo){
  if(!id) 
    throw new Error("You must supply id!");

  // var userData = await User.findById(id);  
  // if(userData === null) throw new Error("No User with id: " + id);

  const validUpdateUserData = await makeUpdateUser(updateUserInfo);

  const { phone_number } = updateUserInfo;

  if(updateUserInfo.hasOwnProperty('password')) {
    updateUserInfo.password = validUpdateUserData.getPassword();
  }

  if(phone_number){
    updateUserInfo.phone_verified = false;
  }

  // if error is not thrown, then we can update with updateUserInfo in database
  return User.findByIdAndUpdate(id, updateUserInfo, { new: true }).then(serialize).catch(errorFormatter);
}


function deleteUser(id){
  return User.findByIdAndDelete(id)
    .then(res => {
      if(!res)
        throw {
          name: 'Error',
          code: 11011, // custom error code
          _id: id, 
        };
      return {
        id: res._id.toString(),
      };
    }).catch(errorFormatter);
}


function dropUsers(){
  return User.deleteMany().catch(errorFormatter);
}


module.exports = {
  listUsers,
  findUserBy,
  findUserById, 
  addUser,
  updateUser, 
  deleteUser, 
  dropUsers
};
