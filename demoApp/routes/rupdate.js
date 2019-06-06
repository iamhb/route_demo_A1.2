/****************************************************************************************
*  Created By  : Haribalan                                                              *
*  Purpose:    : calling of routes from app.js                                          *
*  Created At  : 05-05-2019                                                             *
*  Modified At :                                                                        *
****************************************************************************************/
var mdemoCollection = require('../public/models/mdemocollection').demoCollection;

exports.updateData= function (req, res) 
{
    console.log(" in update api ");
    console.log("values:");
    console.log(req.body.columnValue+ " "+ req.body.oldValue + " " + req.body.newValue);

    var matchQuery={};
    var updateQuery = {} ;
    
    if(req.body.columnValue  == "fname")
    {
        matchQuery={"fname" : req.body.oldValue };
        updateQuery={$set:{"fname": req.body.newValue}};
    }
    else if(req.body.columnValue == "lname")
    {
        matchQuery={"lname" : req.body.oldValue };
        updateQuery={$set:{"lname": req.body.newValue}};
    }
    else if(req.body.columnValue == "age")
    {
        matchQuery={"age" : req.body.oldValue };
        updateQuery={$set:{"age": req.body.newValue}};
    }

    mdemoCollection.updateOne(  matchQuery,
                                updateQuery,function (err, docs)
                                {
                                    if(err)
                                        {
                                            res.status(500).json(err);
                                        }
                                    else if(docs)
                                        {
                                            console.log(docs);
                                            console.log("Updated successfully");
                                            res.status(200).json(docs);
                                        }
                                }); 
}