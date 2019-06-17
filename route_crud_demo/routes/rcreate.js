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
                empid - new employee id data from client
                fname -new first name data from client
                lname -new last name data from client
                age -new age from age
            }
*/

exports.addData= function(req, res) 
{
      console.log("in server add api");
      //console.log("values:" + req.body);
      mdemoCollection.find({ $or: [ { $and:[ {fname : req.body.fname}, 
                                             {lname :req.body.lname}
                                            ] 
                                    },
                                    //$or second argument
                                    {
                                        empid: req.body.empid
                                    }
                                ]
                            },function(err, data) 
                            {
                                //if err occured
                                if(err)
                                {
                                    console.log("error occured while fetching data");
                                    res.status(500).json({ message:"error occured while fetching data", addStatus: "dataFetchError"});
                                }
                                else if (data && data.length > 0 )
                                {
                                    console.log("data already exists:");
                                    console.log(data);
                                    //fetchAllData(req,res,data);
                                    res.status(500).json({ message:"data already exists", addStatus: "dataMatchFound"});
                                } 
                                else if(data && (data.length==0))
                                {
                                    insertData(req,res);
                                } 
                            });
}
function insertData(req,res)
{
    console.log("values");
    console.log(req.body);
    mdemoCollectionObj = new mdemoCollection();
    mdemoCollectionObj.fname=req.body.fname;
    mdemoCollectionObj.lname=req.body.lname;
    mdemoCollectionObj.age=req.body.age;
    mdemoCollectionObj.empid=req.body.empid;
    
    mdemoCollectionObj.save(function(err,data)
    {
        if(err)
        {
            console.log("error occured while adding data" );
            console.log(err);
            res.json({message: "error while adding data" , addStatus: "dataFetchError" });
        }
        else
        {
            console.log("Data added Successfully");
            res.status(200).json({message:"Data added Successfully", addStatus: "dataAdded"});
        }
    });
}



