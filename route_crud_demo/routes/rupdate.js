/****************************************************************************************
*  Created By  : Haribalan                                                              *
*  Purpose:    : calling of routes from app.js                                          *
*  Created At  : 05-05-2019                                                             *
*  Modified At :                                                                        *
****************************************************************************************/
var mdemoCollection = require('../models/mdemocollection').demoCollection;

exports.updateData= function (req, res) 
{
    console.log(" in update api ");
    console.log("values:");
    console.log(req.body.refValue+ " "+ req.body.newFname + " " + req.body.newLname + " "+ req.body.newAge);

    mdemoCollection.update( {"fname" : req.body.refValue },
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