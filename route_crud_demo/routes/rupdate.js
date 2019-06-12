/****************************************************************************************
*  Created By  : Haribalan                                                              *
*  Purpose:    : calling of routes from app.js                                          *
*  Created At  : 10-05-2019                                                             *                                                                       *
****************************************************************************************/
var mdemoCollection = require('../models/mdemocollection').demoCollection;

/*
used to update data in db
@params req{object} http req object from client
req object={
                refValue -for matching the value with db and get document from db
                newFname -new first name data
                newLname -new last name data
                newAge -new age data
            }
*/

exports.updateData= function (req, res) 
{
    console.log(" in update api ");
    console.log("values:");
    console.log(req.body.id+ " "+ req.body.newFname + " " + req.body.newLname + " "+ req.body.newAge);

    mdemoCollection.updateOne(  { _id : req.body.id },
                                {$set:{ "fname": req.body.newFname,
                                        "lname": req.body.newLname,
                                        "age": req.body.newAge }},
                                function (err, docs)
                                {
                                    if(err)
                                    {
                                        res.status(500).json(err);
                                        console.log(err);
                                    }
                                    else if(docs)
                                    {
                                        console.log(docs);
                                        console.log("Updated successfully");
                                        res.status(200).json(docs);
                                    }
                                }); 
}