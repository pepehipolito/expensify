// Object destructuring.
const person = {
  name: 'pepe',
  age: 52,
  location: {
    city: 'Oldsmar',
    temp: 75
  }
};

// A variable (like 'name' here) can be defaulted in case it doesn't exist in the object. If the
// attribute does exist it will be used. It works exactly like optional arguments in functions.
// const {name = 'Anonmous', age} = person;
// We can also rename a variable AND give a default:
const {name: firstName = 'Anonmous', age} = person;
if (firstName && age) {
  console.log(`${firstName} is ${age}.`);
}

if (person.location) {
  // 'temp' gets renamed to 'temperature' here! Therefore, 'temp' cannot be used as a valid var name,
  // only 'temperature' is valid.
  const {city, temp: temperature} = person.location;
  if (city && temperature) {
    console.log(`It's ${temperature} in ${city}.`)
  }
}


const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday',
  publisher: {
    // name: 'Penguin'
  }
};

const { name: publisherName = 'Self-Publisher'} = book.publisher;
console.log(publisherName);  // default 'Self-Published'


// Array destructuring
const address = [
  '1700 Split Fork Drive',
  'Oldsmar',
  'Pinellas',
  'Florida',
  '34677'
];

// For leading or intermingled items we don't need we just don't assign a name but we leave the comma,
// like for the street and county values here.
// For remaining items we don't need we just leave them out, like for the zip value here.
// We cna also assign default values, like for state here.
const [, city, , state = 'New York'] = address;
console.log(`I am in ${city}, ${state}.`)

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [ itemName, , mediumPrice ] = item;

console.log(`A medium ${itemName} costs $${mediumPrice}`);
