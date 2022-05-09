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
    roles
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
      roles
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
      // getSalt: () => salt,
      getRoles: () => roles
    });

  };

};


module.exports = buildMakeUser;
