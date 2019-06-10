/****************************************************************************************
*  Created By  : Haribalan                                                              *
*  Purpose:    : calling of routes from app.js                                          *
*  Created At  : 10-05-2019                                                             *
*  Modified At :                                                                        *
****************************************************************************************/
var mdemoCollection = require('../models/mdemocollection').demoCollection;

/*
used to create data in db
@params req{object} http req object from client
req object={
                fname -new first name data from client
                lname -new last name data from client
                age -new age from age
            }
*/

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



