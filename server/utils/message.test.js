// test to verify object is correct based on the parameters we passed in
var expect = require('expect');

// load in the module we are testing using ES6 restructuring
var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Person';
    var text = 'Test message';
    var message = generateMessage(from, text);

    // assert createdAt value is a number
    expect(message.createdAt).toBeA('number');

    /*
    expect(message).toInclude({
      from: from,
      text: text
    });
    */
    expect(message).toInclude({from,text});

  });
});
