// returns an object
var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  }
};

// set it equal to an object that has a generateMessage property equal to the generateMessage variable declared above
module.exports.generateMessage = generateMessage;
