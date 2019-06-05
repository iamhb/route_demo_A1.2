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
    console.log(req.body.oldValue + " " + req.body.newValue);

    mdemoCollection.updateOne(  {"fname": req.body.oldValue },
                                { $set:{"fname": req.body.newValue} },function (err, docs)
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