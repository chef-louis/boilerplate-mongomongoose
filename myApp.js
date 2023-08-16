require('dotenv').config();
let mongoose = require('mongoose');
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let west = new Person({
    name: 'West',
    age: 44,
    favoriteFoods: ['Guacamole', 'Honey']
  });

  west.save(function(err, data) {
    if (err) {
      console.error(err);
    }
    done(null, data);
  });
};
// createAndSavePerson(console.log);

let arrayOfPeople = [
  {name: 'South', age: 22, favoriteFoods: ['Peach', 'Cashew'], email: 'south@gmail.com'},
  {name: 'North', age: 33, favoriteFoods: ['Banana', 'Apple'], email: 'north@gmail.com'},
  {name: 'East', age: 55, favoriteFoods: ['Grape', 'Plum'], email: 'east@gmail.com'}
];

const createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
  done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

// Person.find({
//   name: 'West' // search query
// })
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function(err, person) {
    if (err) return console.log(err);
    
    person.favoriteFoods.push(foodToAdd);
    person.save(function(err, updatedPerson) {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName }, // search field
    { age: ageToSet }, // field:values to update
    { new: true }, // return document
    function(err, updateResult) {
      if (err) return console.log(err);
      done(null, updateResult);
    });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, removeResult) {
    if (err) return console.log(err);
    done(null, removeResult);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, function(err, removeResult) {
    if (err) return console.log(err);
    done(null, removeResult);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({name: 1, age: 0, favoriteFoods: 1}).exec(function(err, data) {
    if (err) return console.log(err);
    done(err, data);
  })
  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
