
var modelVar = require('../public/models/dbmodel').dd;

exports.addData= function(req, res) {
      console.log("in server api");
      console.log("values:" + req.body);

      var modelVarObj = new modelVar();

      modelVarObj.fname=req.body.fname
      modelVarObj.lname=req.body.lname
      modelVarObj.age=req.body.age
        // create a todo, information comes from AJAX request from Angular
        modelVarObj.save((err)=>{
          res.send(modelVarObj);
        console.log("ADDED");
        });
    }



