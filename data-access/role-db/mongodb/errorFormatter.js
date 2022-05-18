// Same as user error formatter
// If in the future we can change custom errors accordingly

module.exports = (error) => {
  if (error.name == "ValidationError") {
    // from mongoose-unique-validator

    let props = Object.keys(error.errors);
    let messages = [];
    for (let prop of props) {
      // error.errors.message gives us Error, 'gaming_name' to be unique
      // gets the errors.message exact message removing Error, from it
      let message = `${error.errors[`${prop}`].message}`
        .split(",")[1]
        .substring(1);
      messages.push(message.charAt(0).toUpperCase() + message.slice(1));
    }
    throw new Error(messages.join(","));
  } else if (error.code === 11000) {
    // duplicates in db:

    // NOTE: this will never be reached, above unique validation will catch first, here is for reference only
    let props = Object.keys(error.keyValue);
    let messages = [];
    for (let prop of props) {
      messages.push(
        `"'${prop}' : '${error.keyValue[`${prop}`]}'" is already in use`
      );
    }
    throw new Error(messages.join(","));
  } else if (error.code === 11011) {
    throw new Error(`Role not found with "id : '${error._id}'"`);
  } else if (error.name === "CastError") {
    throw new Error(error.reason);
  } else {
    throw new Error("Error in database!");
  }
};
