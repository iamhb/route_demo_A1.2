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
                refValue -for matching the value with db and get document from db, here empid
                newFname -new first name data
                newLname -new last name data
                newAge -new age data
            }
*/
exports.updateData= function (req, res) 
{
    console.log(" in update api ");
    console.log("values:");
    console.log(req.body.empid+ " "+ req.body.newFname + " " + req.body.newLname + " "+ req.body.newAge);

    mdemoCollection.find({ $and:[   
                                    { fname : req.body.newFname }, 
                                    { lname: req.body.newLname } 
                                ]},function(err, data) 
                                            {
                                                //if err occured
                                                if(err)
                                                {
                                                    console.log("error occured while fetching data");
                                                    res.status(500).json({ message:"error occured while fetching data", updateStatus: "dataFetchError"});
                                                }
                                                else if (data && data.length > 0 )
                                                {
                                                    console.log("data already exists:");
                                                    console.log(data);
                                                    //fetchAllData(req,res,data);
                                                    res.status(500).json({ message:"data already exists", updateStatus: "dataMatchFound"});
                                                } 
                                                else if(data && (data.length==0))
                                                {
                                                    updateData(req,res);
                                                } 
                                            });
}  
function updateData(req,res)
{     
    console.log(req.body);
    mdemoCollection.updateOne(  { empid : req.body.empid },
                                { $set:{ "fname": req.body.newFname,
                                        "lname": req.body.newLname,
                                        "age": req.body.newAge }},
                                function (err, docs)
                                {
                                    if(err)
                                    {
                                        console.log(err);
                                        res.status(500).json({ err: err, message: "Error while updating data", updateStatus: "dataFetchError" });
                                    }
                                    else if(docs)
                                    {
                                        console.log(docs);
                                        console.log("Updated successfully");
                                        res.status(200).json({ data: docs , message:" Data updated successfully ", updateStatus: "dataUpdated"});
                                    }
                                });
    }