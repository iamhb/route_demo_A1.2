var mongoose = require('mongoose');

var dd = mongoose.model('demoCollection', {
   fname: {type: String},
   lname: {type: String},
   age: {type: Number}
});

module.exports = {dd:dd}