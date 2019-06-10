/****************************************************************************************
*  Created By  : Haribalan                                                              *
*  Purpose:    : calling of routes from app.js                                          *
*  Created At  : 05-05-2019                                                             *
*  Modified At :                                                                        *
****************************************************************************************/
var mdemoCollection = require('../models/mdemocollection').demoCollection;

exports.addData= function(req, res) {
      console.log("in server api");
      console.log("values:" + req.body);

      var mdemoCollectionObj = new mdemoCollection();

      mdemoCollectionObj.fname=req.body.fname;
      mdemoCollectionObj.lname=req.body.lname;
      mdemoCollectionObj.age=req.body.age;
      
      mdemoCollectionObj.save((err)=>{
          res.send(mdemoCollectionObj);
          console.log("ADDED");
        });
    }



