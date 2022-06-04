// Entity - User

var buildMakeUser = function(userValidator, bcrypt){
  return async ({
    first_name,
    last_name,
    gaming_name,
    password,    
    email, 
    address,
    phone_number,
    dob,
    roles,
    permissions,
    profile_link,
    cover_link,
    social_links,
    exp_points,
    achievements,
    trophies,
    followers,
    following
  } = {}) => {

    var error = userValidator({
      first_name,
      last_name,
      gaming_name,
      password,      
      email, 
      address,
      phone_number,
      dob,
      roles,
      permissions,
      profile_link,
      cover_link,
      social_links,
      exp_points,
      achievements,
      trophies,
      followers,
      following      
    });

    if(error instanceof Object) throw new Error(error.errorList);

    // create password hash
    const saltRounds = 5;
    var salt;
    var hashedPassword;

    if(password != undefined) {
      salt = await bcrypt.genSalt(saltRounds);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    return Object.freeze({
      getFirstName: () => first_name,
      getLastName: () => last_name,
      getGamingName: () => gaming_name,
      getPassword: () => hashedPassword,
      getEmail: () => email,
      getPhoneNumber: () => phone_number,      
      getAddress: () => address,
      getDOB: () => dob,
      getRoles: () => roles,
      getPermissions: () => permissions,
      getProfileLink: () => profile_link,
      getCoverLink: () => cover_link,
      getSocialLinks: () => social_links,
      getExpPoints: () => exp_points,
      getAchievements: () => achievements,
      getTrophies: () => trophies,
      getFollowers: () => followers,
      getFollowing: () => following
    });
    
  };

};


module.exports = buildMakeUser;
