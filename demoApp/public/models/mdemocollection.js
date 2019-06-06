/****************************************************************************************
*  Created By  : Haribalan                                                              *
*  Purpose:    : Creating model for collection "demoCollection"                         *
*  Created At  : 05-05-2019                                                             *
*  Modified At :                                                                        *
****************************************************************************************/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var demoCollectionSchema = new Schema({
	fname: {type: String},
   	lname: {type: String},
   	age: {type: String}
});

var demoCollection= mongoose.model('demoCollection', demoCollectionSchema);
module.exports = {demoCollection : demoCollection};