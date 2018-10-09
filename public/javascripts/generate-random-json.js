const casual = require('casual');
const jsf = require('json-schema-faker');
const fakejs = require('fake.js');
var Chance = require('chance');



exports.sayHi = sayHi;
exports.makeFake = makeFake;

// using fake.js
function makeFake() {
  var uuid = casual.uuid;
  var output;
  var chance = new Chance();
  console.log(uuid);
  var person = {
    id: 'hash',
    prefix: 'prefix',
    first_name: 'first',
    last_name: 'last',
    suffix: 'suffix',
    birthday: 'birthday',
    Age: 'age',
    Phone: 'phone',
    Email: 'email',
    Address: 'address',
    City: 'city',
    State: 'state',
    Country: 'USA',
    temp_username: 'string',
    temp_password: 'string',
    temp_username: () => { return chance.word() + chance.natural({ min: 1, max: 9999 }) },
    birthday: () => { return chance.birthday({ string: true }) },
    suffix: () => { return chance.suffix() },
    prefix: () => { return chance.prefix() }
  };

  fakejs.create(person, 5, data => { 
    output = data; 
  });
  return output;
}

function sayHi() {
  return 'hello from generate random json file ... '
}