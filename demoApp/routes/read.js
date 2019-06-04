
var modelVar = require('../public/models/dbmodel').dd;

exports.showData= function(req, res) { 
	console.log("ggggg")
        
        var modelVarObj = new modelVar();
        modelVar.find(function(err, data) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
            console.log(data);
            res.json(data); // return all todos in JSON format
        });
    }
